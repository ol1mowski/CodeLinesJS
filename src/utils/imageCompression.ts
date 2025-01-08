export const compressImage = async (
  file: File | Blob,
  options = { maxWidth: 800, maxHeight: 800, quality: 0.8 }
): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > options.maxWidth) {
        height = Math.round((height * options.maxWidth) / width);
        width = options.maxWidth;
      }
      if (height > options.maxHeight) {
        width = Math.round((width * options.maxHeight) / height);
        height = options.maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(file as Blob);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => resolve(blob || file as Blob),
        'image/jpeg',
        options.quality
      );
    };
  });
};

export const compressImageUrl = async (
  url: string,
  options = { maxWidth: 800, maxHeight: 800, quality: 0.8 }
): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const compressedBlob = await compressImage(blob, options);
    return URL.createObjectURL(compressedBlob);
  } catch (error) {
    console.error('Error compressing image:', error);
    return url;
  }
}; 