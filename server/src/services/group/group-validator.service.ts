import { GroupRepository } from '../../repositories/group.repository.js';
import { AuthError, ValidationError } from '../../utils/errors.js';
import { GroupCreateData } from '../../types/group.types.js';
import { Types } from 'mongoose';

export class GroupValidatorService {
  static async validateGroupCreate(data: GroupCreateData): Promise<void> {
    if (!data.userId) {
      throw new AuthError('Brak autoryzacji');
    }

    if (!data.name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    if (data.name.length < 3 || data.name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
    }

    const existingGroup = await GroupRepository.findByName(data.name);
    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }
  }

  static async validateGroupName(name: string, groupId?: string): Promise<void> {
    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
    }

    const existingGroup = await GroupRepository.findByName(name);
    if (existingGroup && existingGroup._id.toString() !== groupId) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }
  }
  
  static validateGroupId(groupId: string): void {
    if (!groupId) {
      console.error('Próba walidacji pustego ID grupy');
      throw new ValidationError('ID grupy jest wymagane');
    }
    
    console.log(`Walidacja ID grupy: ${groupId}, typ: ${typeof groupId}`);
    
    if (typeof groupId !== 'string') {
      console.error(`Nieprawidłowy typ ID grupy: ${typeof groupId}`);
      throw new ValidationError('ID grupy musi być ciągiem znaków');
    }
    
    if (!Types.ObjectId.isValid(groupId)) {
      console.error(`Nieprawidłowy format ID grupy: ${groupId}`);
      throw new ValidationError(`Nieprawidłowy format ID grupy: ${groupId}`);
    }
  }

  static async checkGroupName(
    name: string, 
    currentGroupId?: string
  ): Promise<{ available: boolean, message: string }> {
    if (name.length < 3 || name.length > 50) {
      return {
        available: false,
        message: 'Nazwa grupy musi mieć od 3 do 50 znaków'
      };
    }
    
    const existingGroup = await GroupRepository.findByName(name);
    
    if (!existingGroup) {
      return {
        available: true,
        message: 'Nazwa jest dostępna'
      };
    }
    
    if (currentGroupId && existingGroup._id.toString() === currentGroupId) {
      return {
        available: true,
        message: 'To jest aktualna nazwa tej grupy'
      };
    }
    
    return {
      available: false,
      message: 'Grupa o takiej nazwie już istnieje'
    };
  }
} 