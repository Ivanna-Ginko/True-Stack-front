import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';
import clsx from 'clsx';

export const Loader = ({
  small = false,
  variant = 'spinner',
  className,
  inline = false,
}) => {
  if (variant === 'skeleton') {
    return (
      <span
        className={clsx(
          styles.skeleton,
          small && styles.small,
          inline && styles.inline,
          className
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        small ? styles.smallLoaderWrapper : styles.backdrop,
        className
      )}
    >
      <ClipLoader
        color="#000000"
        loading={true}
        size={small ? 24 : 80}
        speedMultiplier={1}
      />
    </div>
  );
};

