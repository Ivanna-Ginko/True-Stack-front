import React from 'react'
import AuthorsItem from '../AuthorsItem/AuthorsItem'

const AuthorsList = ({ authors, onAuthCardClick }) => {

  if (!authors || authors.length === 0) {
    return <p>Авторів не знайдено</p>
  }

  return (
    <>
      <ul>
        {authors.map((item) => (
          <li key={item._id}>
            <div>
              <AuthorsItem item={item} onImageClick={onAuthCardClick} />
            </div>
          </li>

        ))}

      </ul>

    </>

  )
}

export default AuthorsList