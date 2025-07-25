import React from 'react'
import AuthorsItem from '../AuthorsItem/AuthorsItem'

const AuthorsList = ({ authors, onAuthCardClick }) => {
  return (
    <>
      <h2>AuthorsList</h2>

      <ul>
        {authors.map(
          <li key={item.id}>
            <div>
              <AuthorsItem item={item} onImageClick={onAuthCardClick} />
            </div>
          </li>

        )}

      </ul>

    </>

  )
}

export default AuthorsList