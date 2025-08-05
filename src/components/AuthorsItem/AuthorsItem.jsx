import css from './AuthorsItem.module.css'
import clsx from 'clsx';
import defaultAvatar from '../../../public/img/defaultAvatar.png'

const AuthorsItem = ({ item, onAuthCardClick, imgSize = 'default' }) => {
  const handleClick = () => {
    onAuthCardClick(item._id);
  };

  const fullName = item.name;
  const firstName = fullName.split(' ')[0];

  const isValidAvatar =
    item.avatarUrl &&
    item.avatarUrl.trim() !== '' &&
    item.avatarUrl.trim().toLowerCase() !== 'null' &&
    item.avatarUrl.trim().toLowerCase() !== 'undefined';

  const avatarSrc = isValidAvatar ? item.avatarUrl : defaultAvatar;

  //const avatarSrc = item.avatarUrl && item.avatarUrl.trim() !== '' ? item.avatarUrl : null;
  return (
    <div onClick={handleClick} className={css.itemwrapper}>
      <img
        src={avatarSrc}
        className={clsx(css.img, css[`img_${imgSize}`])}
        alt={`Фото автора ${item.name}`}
        onError={(e) => e.target.src = defaultAvatar}
      />
      <p className={css.text}>{firstName}</p>
    </div>
  )
}

export default AuthorsItem