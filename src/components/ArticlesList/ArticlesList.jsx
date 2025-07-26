import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'
import Container from '../container/Container'

const ArticlesList = () => {
  return (
    <>
      <Container>
        <ul className={css.list}>
            <ArticlesItem/>
            <ArticlesItem/>
            <ArticlesItem/>
        </ul>
        <LoadMore />
      </Container>
    </>
  )
}

export default ArticlesList