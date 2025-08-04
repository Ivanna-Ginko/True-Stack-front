
import React from 'react'
import AuthorsItem from '../AuthorsItem/AuthorsItem'
import css from './AuthorsList.module.css'
import { Loader } from '../Loader/Loader'


const AuthorsList = ({ authors, onAuthCardClick, imgSize }) => {

  if (!authors || authors.length === 0) {
    return <p>Авторів не знайдено</p>;
  }

  return (
    <>

      <ul className={css.list}>
        {authors && authors.map((item) => (
          <li key={item._id} className={css.authli}>
            <div>
              <AuthorsItem
                item={item}
                onAuthCardClick={onAuthCardClick}
                imgSize={imgSize}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AuthorsList;
