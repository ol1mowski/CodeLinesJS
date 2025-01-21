import { memo, useRef } from "react";
import { styles } from "./Avatar.styles";
import { Button } from "../../../../../../UI/Button/Button.component";

type AvatarProps = {
  onChangeAvatar: (file: File) => void;
  isUploading?: boolean;
  src: string;
  alt: string;
  onReset?: () => void;
  preview: string | null;
  className?: string;
};

export const Avatar = memo(({ 
  onChangeAvatar, 
  isUploading, 
  src, 
  alt, 
  preview 
}: AvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChangeAvatar(file);
    }
  };

  const avatar = preview || src || `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiMyMDIwMjAiLz4KICA8cGF0aCBkPSJNNTAgNjBjMTEuMDQ2IDAgMjAtOC45NTQgMjAtMjBzLTguOTU0LTIwLTIwLTIwLTIwIDguOTU0LTIwIDIwIDguOTU0IDIwIDIwIDIweiIgZmlsbD0iIzQwNDA0MCIvPgo8L3N2Zz4=`;

  return (
    <div className={styles.container}>
      <img src={avatar} alt={alt} className={styles.image} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className={styles.button}
      >
        <span className="sr-only">Zmień avatar</span>
        {isUploading ? "..." : "📷"}
      </Button>
    </div>
  );
});

Avatar.displayName = "Avatar"; 