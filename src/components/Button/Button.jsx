import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({
  size = 'md',
  variant = '',
  color = '',
  onClick,
  children,
}) {
  return (
    <button
      className={clsx(css.button, css[size], css[variant], css[color])}
      onClick={onClick}
    >
      <span className={css.content}>{children}</span>
    </button>
  );
}
