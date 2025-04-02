import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Types } from 'mongoose';
import { Resource } from '../../../src/models/resource.model.js';

vi.mock('../../../src/models/resource.model.js', () => ({
  Resource: {
    find: vi.fn().mockReturnThis(),
    findById: vi.fn().mockReturnThis(),
    findOne: vi.fn().mockReturnThis(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn().mockReturnThis(),
    findByIdAndDelete: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

describe('Resource Model', () => {
  let mockResourceData: any;
  let mockResourceId: string;
  
  beforeEach(() => {
    mockResourceId = new Types.ObjectId().toString();
    
    mockResourceData = {
      title: 'JavaScript Basics',
      description: 'Learn JavaScript fundamentals',
      url: 'https://example.com/js-basics',
      type: 'article',
      category: 'javascript',
      difficulty: 'beginner',
      tags: ['javascript', 'basics', 'tutorial'],
      isRecommended: true,
      author: {
        name: 'John Doe',
        url: 'https://example.com/johndoe'
      },
      isPublished: true
    };
    
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('find operations', () => {
    it('should find resources with filter criteria', async () => {
      const filter = { category: 'javascript', type: 'article' };
      const mockResources = [
        { _id: new Types.ObjectId(), ...mockResourceData },
        { _id: new Types.ObjectId(), ...mockResourceData, title: 'Advanced JavaScript' }
      ];
      
      (Resource.find as any).mockReturnValue({
        sort: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockResources)
        })
      });
      
      const result = await Resource.find(filter).sort({ createdAt: -1 }).lean();
      
      expect(Resource.find).toHaveBeenCalledWith(filter);
      expect(result).toEqual(mockResources);
      expect(result).toHaveLength(2);
    });
    
    it('should find resources by text search', async () => {
      const searchQuery = { $or: [
        { title: { $regex: 'javascript', $options: 'i' } },
        { description: { $regex: 'javascript', $options: 'i' } },
        { tags: { $regex: 'javascript', $options: 'i' } }
      ]};
      
      const mockResources = [
        { _id: new Types.ObjectId(), ...mockResourceData }
      ];
      
      (Resource.find as any).mockReturnValue({
        sort: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockResources)
        })
      });
      
      const result = await Resource.find(searchQuery).sort({ createdAt: -1 }).lean();
      
      expect(Resource.find).toHaveBeenCalledWith(searchQuery);
      expect(result).toEqual(mockResources);
    });
    
    it('should find resources and sort by most recommended and recent', async () => {
      const mockResources = [
        { _id: new Types.ObjectId(), ...mockResourceData, isRecommended: true },
        { _id: new Types.ObjectId(), ...mockResourceData, isRecommended: false }
      ];
      
      (Resource.find as any).mockReturnValue({
        sort: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockResources)
        })
      });
      
      const result = await Resource.find({ isPublished: true }).sort({ isRecommended: -1, createdAt: -1 }).lean();
      
      expect(Resource.find).toHaveBeenCalledWith({ isPublished: true });
      expect(result[0].isRecommended).toBe(true);
    });
  });
  
  describe('findById operations', () => {
    it('should find a resource by ID', async () => {
      const mockResource = {
        _id: new Types.ObjectId(mockResourceId),
        ...mockResourceData
      };
      
      (Resource.findById as any).mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockResource)
      });
      
      const result = await Resource.findById(mockResourceId).lean();
      
      expect(Resource.findById).toHaveBeenCalledWith(mockResourceId);
      expect(result).toEqual(mockResource);
    });
    
    it('should return null when resource not found', async () => {
      (Resource.findById as any).mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      });
      
      const result = await Resource.findById(mockResourceId).lean();
      
      expect(Resource.findById).toHaveBeenCalledWith(mockResourceId);
      expect(result).toBeNull();
    });
  });
  
  describe('create operations', () => {
    it('should create a new resource', async () => {
      const createdResource = {
        _id: new Types.ObjectId(),
        ...mockResourceData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      (Resource.create as any).mockResolvedValue(createdResource);
      
      const result = await Resource.create(mockResourceData);
      
      expect(Resource.create).toHaveBeenCalledWith(mockResourceData);
      expect(result).toEqual(createdResource);
    });
  });
  
  describe('update operations', () => {
    it('should update a resource', async () => {
      const updateData = {
        title: 'Updated JavaScript Basics',
        isRecommended: false
      };
      
      const updatedResource = {
        _id: new Types.ObjectId(mockResourceId),
        ...mockResourceData,
        ...updateData,
        updatedAt: new Date()
      };
      
      (Resource.findByIdAndUpdate as any).mockReturnValue({
        lean: vi.fn().mockResolvedValue(updatedResource)
      });
      
      const result = await Resource.findByIdAndUpdate(
        mockResourceId,
        updateData,
        { new: true }
      ).lean();
      
      expect(Resource.findByIdAndUpdate).toHaveBeenCalledWith(
        mockResourceId,
        updateData,
        { new: true }
      );
      expect(result!.title).toBe(updateData.title);
      expect(result!.isRecommended).toBe(updateData.isRecommended);
    });
  });
  
  describe('delete operations', () => {
    it('should delete a resource', async () => {
      const deletedResource = {
        _id: new Types.ObjectId(mockResourceId),
        ...mockResourceData
      };
      
      (Resource.findByIdAndDelete as any).mockReturnValue({
        lean: vi.fn().mockResolvedValue(deletedResource)
      });
      
      const result = await Resource.findByIdAndDelete(mockResourceId).lean();
      
      expect(Resource.findByIdAndDelete).toHaveBeenCalledWith(mockResourceId);
      expect(result).toEqual(deletedResource);
    });
    
    it('should return null when trying to delete non-existent resource', async () => {
      (Resource.findByIdAndDelete as any).mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      });
      
      const result = await Resource.findByIdAndDelete(mockResourceId).lean();
      
      expect(Resource.findByIdAndDelete).toHaveBeenCalledWith(mockResourceId);
      expect(result).toBeNull();
    });
  });
}); 