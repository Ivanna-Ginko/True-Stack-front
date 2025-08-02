import React from 'react';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import css from './AuthorsList.module.css';

const AuthorsList = ({ authors, onAuthCardClick, imgSize }) => {

  if (!authors || authors.length === 0) {
    return <p>Авторів не знайдено</p>;
  }

  return (
    <>
      <ul className={css.list}>
        {authors.map((item) => (
          <li key={item._id}>
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
