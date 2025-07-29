import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'
import css from './ArticlesList.module.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'


const ArticlesList = ({ list }) => {

  const user = useSelector(selectUser)
  console.log(user)




  return (
    <>
        <ul className={css.list}>
          {!list && <p>wait....</p>}
          {list && 
            list.map(article => {
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

  //const filteredArticles = filter === 'Popular'
    //? allArticles.filter(article => article.isPopular)
   // : allArticles;

 //articleList.map(article => (
            

