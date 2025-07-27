import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'
import Container from '../container/Container'


const ArticlesList = () => {
  //const filteredArticles = filter === 'Popular'
    //? allArticles.filter(article => article.isPopular)
   // : allArticles;



  return (
    <>
      <Container>
        <ul className={css.list}>
                <ArticlesItem/>
        </ul>
        <LoadMore />
      </Container>
    </>
  )
}

export default ArticlesList



 //filteredArticles.map(article => (
                  //key={article.id}
                  //id={article.id}
                  //title={article.title}
                  //author={article.author}
                  //description={article.description}
                  //image={article.image}