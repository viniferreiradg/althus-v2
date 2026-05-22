import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md';
  alt?: string;
}

export function Avatar({ src, initials, size = 'md', alt }: AvatarProps) {
  return (
    <div className={[styles.avatar, styles[size]].join(' ')}>
      {src
        ? <img className={styles.avatarImg} src={src} alt={alt ?? ''} />
        : <span className={styles.avatarInitials}>{initials}</span>
      }
    </div>
  );
}
