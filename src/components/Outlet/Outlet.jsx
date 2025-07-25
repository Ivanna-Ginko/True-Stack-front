import React from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import ArticlesList from '../ArticlesList/ArticlesList'
import Creators from '../Creators/Creators'

const Outlet = () => {
  return (
    <>
      <h1>outlet</h1>
      <Hero />
      <About />
      <ArticlesList />
      <Creators />

    </>
  )
}

export default Outlet