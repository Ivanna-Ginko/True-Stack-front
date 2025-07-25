import React from 'react'

const AuthorsItem = ({ item, onAuthCardClick }) => {
  return (
    <div>AuthorsItem

      <div>
        <img src={item.avatarUrl} alt='' onClick={() => onAuthCardClick()} />
      </div>

    </div>

  )
}

export default AuthorsItem