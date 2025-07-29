import React, { useState, useEffect } from 'react'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import css from './ArticlesPage.module.css'
import ArticleListSelect from '../../components/ArticleListSelect/ArticleListSelect'
import Container from '../../components/container/Container'
import { fetchArticles, fetchPopularArticles } from '../../services/api.js'
import Pagination from '../../components/Pagination/Pagination'


const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular'); 
  const [articleList, setArticleList] = useState ([]);


  const handleSelectChange = (value) => {
    setSelectedFilter(value); 
  };


  useEffect(() => {
    const getArticles = async () => {
      try {
        let articles;
        if (selectedFilter === 'Popular') {
          articles = await fetchPopularArticles();
        } else {
          articles = await fetchArticles();
        }
        setArticleList(articles.data.data);
      } catch (err) {
        console.log(err);
      }
    };
      getArticles()
  }, [selectedFilter]);
  
  const articlesArr = articleList.data;
  return (
    <>
      <Container>
        <SectionTitle title={title}/>
        <div className={css.box}>
          <p className={css.quantity}>{articleList.totalItems} articles</p>
          <div style={{ width: '169px' }}>
            <ArticleListSelect onChange={handleSelectChange}/>
          </div>
        </div>
        <ArticlesList filter={selectedFilter} list={articlesArr}/>
        <Pagination />
      </Container>
    </>
  )
}




export default ArticlesPage