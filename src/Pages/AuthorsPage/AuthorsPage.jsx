import React from 'react'
import LoadMore from '../../components/LoadMore/LoadMore'
import AuthorsList from '../../components/AuthorsList/AuthorsList'

const AuthorsPage = () => {
  return (
    <>
        <AuthorsList/>
        <LoadMore/>
    </>
  )
}

export default AuthorsPage