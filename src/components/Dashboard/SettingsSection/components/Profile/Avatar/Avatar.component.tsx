import { memo } from "react";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./Avatar.styles";

type AvatarProps = {
  src: string;
  alt: string;
  onChangeAvatar: () => void;
};

export const Avatar = memo(({ src, alt, onChangeAvatar }: AvatarProps) => (
  <div className={styles.container}>
    <img
      src={src}
      alt={alt}
      className={styles.image}
    />
    <Button
      type="button"
      onClick={onChangeAvatar}
      className={styles.button}
    >
      <span className="sr-only">Zmień avatar</span>
      📷
    </Button>
  </div>
));

Avatar.displayName = "Avatar"; 