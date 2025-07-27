import React, { useState } from 'react'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import css from './ArticlesPage.module.css'
import ArticleListSelect from '../../components/ArticleListSelect/ArticleListSelect'
import Container from '../../components/container/Container'


const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular'); 

  const handleSelectChange = (value) => {
    setSelectedFilter(value); 
    console.log('Фільтр:', selectedFilter);
  };

  return (
    <>
      <Container>
        <SectionTitle title={title}/>
        <div className={css.box}>
          <p className={css.quantity}>?? articles</p>
          <div style={{ width: '169px' }}>
            <ArticleListSelect onChange={handleSelectChange}/>
          </div>
        </div>
        <ArticlesList filter={selectedFilter}/>
      </Container>
    </>
  )
}




export default ArticlesPage