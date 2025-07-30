import React, { useState, useEffect } from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { fetchArticles } from '../../services/api.js'

//уточнити, помилка через імпорт селектора редакс

const ArticlesList = ({ config }) => {
  const [articleList, setArticleList] = useState ([]);
  const user = useSelector(selectUser)
  
  useEffect(() => {
  const getArticles = async () => {
    try {
      const articles = await fetchArticles(config);
      setArticleList(articles.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  getArticles();
}, [config]);

  const articlesArr = articleList.data

  return (
    <>
        <ul className={`${css.list} }`}>
          {!articlesArr && <p>wait....</p>}
          {articlesArr && 
            articlesArr.map(article => {
              const isAuthor = article.author === user?.user?.id;
              const isSaved = isAuthor && user.savedArticles?.includes(article.id);
                return (
                <ArticlesItem
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  author={article.author}
                  description={article.title}
                  image={article.img}
                  isAuthor = {isAuthor}
                  saved = {isSaved}/>
            )}
          )}
        </ul>
    </>
  )
}

export default ArticlesList



