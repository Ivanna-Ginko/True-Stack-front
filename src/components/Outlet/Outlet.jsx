import React from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import ArticlesList from '../ArticlesList/ArticlesList'
import Creators from '../Creators/Creators'
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks'

const Outlet = () => {
  return (
    <>
      <h1>outlet</h1>
      <Hero />
      <About />
      <ArticlesList />
      <Creators />
      <ButtonAddToBookmarks articleId="12345"/>
    </>
  )
}

export default Outlet