import React from 'react'

const AuthorsItem = ({ item, onAuthCardClick }) => {
  const handleClick = () => {
    onAuthCardClick(item._id.$oid);
  };
  return (
    <div onClick={handleClick}>
      <img src={item.avatarUrl} alt={`Фото автора ${item.name}`} />
      <p>{item.name}</p>
    </div>
  )
}

export default AuthorsItem