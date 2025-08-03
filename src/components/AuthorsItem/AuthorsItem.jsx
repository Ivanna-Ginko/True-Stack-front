import css from './AuthorsItem.module.css'
import clsx from 'clsx';

const AuthorsItem = ({ item, onAuthCardClick,imgSize = 'default' }) => {
  const handleClick = () => {
    onAuthCardClick(item._id);
  };

const fullName = item.name;
const firstName = fullName.split(' ')[0]
//console.log(firstName)

  return (
    <div onClick={handleClick} className={css.itemwrapper}>
      <img
        src={item.avatarUrl}
        className={clsx(css.img, css[`img_${imgSize}`])}
        alt={`Фото автора ${item.name}`}
      />
      <p className={css.text}>{firstName}</p>
    </div>
  )
}

export default AuthorsItem