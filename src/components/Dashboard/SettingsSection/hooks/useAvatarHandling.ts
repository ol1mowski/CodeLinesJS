import { useState, useCallback, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useAvatarHandling = (updateAvatar: any) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleChangeAvatar = useCallback(async (file: File) => {
    try {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
      const preview = URL.createObjectURL(file);
      setPreviewAvatar(preview);
      await updateAvatar.mutateAsync(file);
    } catch (error) {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
        setPreviewAvatar(null);
      }
      showToast('Nie udało się zaktualizować avatara', 'error');
    }
  }, [updateAvatar, previewAvatar, showToast]);

  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  return {
    previewAvatar,
    setPreviewAvatar,
    handleChangeAvatar
  };
}; 