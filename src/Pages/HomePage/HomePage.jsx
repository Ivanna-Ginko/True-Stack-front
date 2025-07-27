import React from 'react'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import Creators from '../../components/Creators/Creators'

const Outlet = () => {
  return (
    <>
      <Hero />
      <About />
      <ArticlesList />
      <Creators />
    </>
  )
}

export default Outlet