import clsx from 'clsx';
import css from '../Button/Button.module.css';
import { Link } from 'react-router-dom';

export default function AppLink({
  size = 'md',
  variant = 'fill',
  color = 'black',
  style,
  to,
  onClick,
  children,
}) {
  return (
    <Link
      to={to}
      className={clsx(
        css.button,
        css[size],
        css[variant],
        css[color],
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
