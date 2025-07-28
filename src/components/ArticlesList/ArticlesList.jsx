import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'


const ArticlesList = ({ list }) => {

  

  return (
    <>
        <ul className={css.list}>
          {!list && <p>wait....</p>}
       {list && 
            list.map(article => (
                <ArticlesItem
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  author={article.author}
                  description={article.description}
                  image={article.image} />
            ))}
        </ul>
    </>
  )
}

export default ArticlesList

  //const filteredArticles = filter === 'Popular'
    //? allArticles.filter(article => article.isPopular)
   // : allArticles;

 //articleList.map(article => (
            

