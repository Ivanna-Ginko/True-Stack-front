import React, { useState, useEffect, useRef } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
//import LoadMore from '../LoadMore/LoadMore';
import css from './ArticlesList.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { fetchArticles } from '../../services/api.js';
import toast, { Toaster } from 'react-hot-toast';

//уточнити, помилка через імпорт селектора редакс

const ArticlesList = ({
  config,
  onTotalItemsChange,
  hideFourthOnDesktop,
  onLoadMore,
  onHasMoreChange,
}) => {
  const [articleList, setArticleList] = useState ([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  //const [totalItems, setTotalItems] = useState(0);

  const user = useSelector(selectUser);
  const bottomRef = useRef(null);

  useEffect(() => {
    setPage(1);
    setArticleList([]);
  }, [config]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
      
        const updatedConfig = {
          ...config,
          params: {
            ...(config?.params || {}),
            page,
          },
        };
        const response = await fetchArticles(updatedConfig);
        const data = response.data.data;
        const articles = data.data;
        const total = data.totalItems;
        const newArticleList = page === 1 ? articles : [...articleList, ...articles];
        setArticleList(newArticleList);        
        //setTotalItems(total);

        if (onTotalItemsChange) {
          onTotalItemsChange(total);
        }

        const hasMore = newArticleList.length < total;
        if (onHasMoreChange) {
          onHasMoreChange(hasMore);
        }
        
      } catch (error) {
        setIsError(true);
        toast.error('Please, try again');
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, [config, page]);

  useEffect(() => {
    if (onLoadMore) {
      onLoadMore(() => {
        setPage(prev => prev + 1);
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }
  }, [onLoadMore]);
  //const articlesArr = articleList.data;
  
  return (
    <>
      <ul className={`${css.list} ${hideFourthOnDesktop ? css.hideFourth : ''}`}>
        {!articleList.length && <p>wait....</p>}
        {articleList.map(article => {
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
              isAuthor={isAuthor}
              saved={isSaved}
            />
          );
        })}
      </ul>      
    </>
  )
}

export default ArticlesList;
