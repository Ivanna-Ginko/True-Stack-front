import React, { useEffect, useState } from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'
import Container from '../container/Container'
import fetchArticles from '../../services/api.js'


const ArticlesList = () => {

  const [articleList, setarticleList] = useState ([]);

    useEffect(() => {
      const getArticles = async () => {
        try {
          const articles = await fetchArticles()
          setarticleList(articles.data.data.data)
          console.log(articles.data.data.data)
        }
        catch (err) {
          console.log (err)
        }
      }
      getArticles()
  }, []);

  console.log (articleList)

  return (
    <>
      <Container>
        <ul className={css.list}>
          {
            articleList.map(article => (
                <ArticlesItem
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  author={article.author}
                  description={article.description}
                  image={article.image} />
            ))}
        </ul>
        <LoadMore />
      </Container>
    </>
  )
}

export default ArticlesList

  //const filteredArticles = filter === 'Popular'
    //? allArticles.filter(article => article.isPopular)
   // : allArticles;

 //articleList.map(article => (
            

