import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import css from './ArticlesList.module.css'



const ArticlesList = ({ articles, user, hideFourthOnDesktop}) => {


    return(
      <ul className={`${css.list} ${hideFourthOnDesktop ? css.hideFourth : ''}`}>
      {Array.isArray(articles) && articles.map(article => { 
        const isAuthor = article.ownerId === user.id;
        const isSaved = isAuthor && user.savedArticles?.includes(article._id);        
        return(
      <ArticlesItem
            key={`${article._id}-${article._keySuffix}`}
            id={article._id}
            title={article.title}
            author={article.author}
            description={article.article}
            image={article.img}
            isAuthor={isAuthor}
            saved={isSaved}
      />)
      })
    }
    </ul>
    );
}

export default ArticlesList
