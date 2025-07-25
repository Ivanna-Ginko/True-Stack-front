import React from 'react'
import { Link } from 'react-router-dom'
// import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks'
import s from '../AuthorsItem/ArticlesItem.module.css'

const AuthorsItem = ({id, image, author, title, description}) => {
  return (
    <li className= {s.card}>
      <img src={image} alt={title} className={s.image}/>
      <div className={s.content}>
        <p className={s.author}>
          {author}
        </p>
        <h3 className={s.title}>
          {title}
        </h3>
        <p className={s.description}>
          {description}
        </p>
      </div>
      <div className= {s.bottom}>
      <Link to={`/articles/${id}`}>
        Learn more
      </Link>
      </div>
      {/* <ButtonAddToBookmarks articleId={id}/> */}
    </li>
  )
}

export default AuthorsItem