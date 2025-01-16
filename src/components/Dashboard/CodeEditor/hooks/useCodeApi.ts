import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { codeService } from '../services/codeService';
import { SaveCodeDto } from '../types/api.types';

export const useCodeApi = () => {
  const [saveError, setSaveError] = useState<string | null>(null);

  const { data: savedCodes, isLoading: isLoadingCodes } = useQuery({
    queryKey: ['user-codes'],
    queryFn: codeService.getUserCodes,
  });

  const { mutate: saveCode, isPending: isSaving } = useMutation({
    mutationFn: (data: SaveCodeDto) => codeService.saveCode(data),
    onError: (error: Error) => {
      setSaveError(error.message);
    },
    onSuccess: () => {
      setSaveError(null);
    }
  });

  return {
    savedCodes,
    isLoadingCodes,
    saveCode,
    isSaving,
    saveError
  };
}; 