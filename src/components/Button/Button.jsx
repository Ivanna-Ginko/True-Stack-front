import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({
  size = 'md',
  variant = 'fill',
  color = 'black',
  onClick,
  children,
}) {
  return (
    <button
      className={clsx(css.button, css[size], css[variant], css[color])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
