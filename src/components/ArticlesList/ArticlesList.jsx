import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import css from './ArticlesList.module.css'



const ArticlesList = ({ articles, user }) => {


  
 //${hideFourthOnDesktop ? css.hideFourth : ''}
    return(
      <ul className={`${css.list} `}>
      {Array.isArray(articles) && articles.map(article => { 
        const isAuthor = article.author === user?.user?.id;
        const isSaved = isAuthor && user.savedArticles?.includes(article.id);        
        return(
      <ArticlesItem
            key={article._id}
            id={article._id}
            title={article.title}
            author={article.author}
            description={article.description}
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



