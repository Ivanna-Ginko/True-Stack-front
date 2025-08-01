import css from "./AuthorsItem.module.css";

const AuthorsItem = ({ item, onAuthCardClick }) => {
  const handleClick = () => {
    onAuthCardClick(item._id);
  };
  return (
    <div onClick={handleClick} className={css.contanier}>
      <img className={css.img} src={item.avatarUrl} alt={`Фото автора ${item.name}`} />
      <p className={css.name}>{item.name}</p>
    </div>
  )
}

export default AuthorsItem