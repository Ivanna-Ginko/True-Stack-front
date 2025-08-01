import React, { useState } from 'react'
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks'
import EditArticleButton from '../EditArticleButton/EditArticleButton'
import AppLink from '../AppLink/AppLink'
import s from '../ArticlesItem/ArticlesItem.module.css'

const ArticlesItem = ({id, image, author, title, description, isSaved=false, isAuthor=false}) => {
  const [saved, setSaved] = useState(isSaved);

  const handleToggle = ()=>{
    setSaved(!saved);
  };
  return (
    <li key={id} className= {s.card}>
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
      <AppLink variant='outline' size='md' color='green' to={`/articles/${id}`}>
        Learn more
      </AppLink>
      { isAuthor ? (
        <EditArticleButton articleId={id}/>
      ) : <ButtonAddToBookmarks
            articleId={id}
            onUpdate={handleToggle}
            variant={saved ? "saved" : undefined}
          />
      }
      </div>
    </li>
  )
}

export default ArticlesItem