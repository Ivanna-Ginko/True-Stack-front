import css from './AuthorsItem.module.css'

const AuthorsItem = ({ item, onAuthCardClick }) => {
  const handleClick = () => {
    onAuthCardClick(item._id);
  };

const fullName = item.name;
const firstName = fullName.split(' ')[0]
console.log(firstName)

  return (
    <div onClick={handleClick}>
      <img src={item.avatarUrl} className={css.img} alt={`Фото автора ${item.name}`} />
      <p className={css.text}>{firstName}</p>
    </div>
  )
}

export default AuthorsItem