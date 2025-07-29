import React from 'react'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import PopularArticles from '../../components/PopularArticles/PopularArticles'
import TopCreators from '../../components/TopCreators/TopCreators'

const Outlet = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularArticles />
      <TopCreators />
    </>
  )
}

export default Outlet