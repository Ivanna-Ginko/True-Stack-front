import React, { useState } from 'react'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import css from './ArticlesPage.module.css'
import ArticleListSelect from '../../components/ArticleListSelect/ArticleListSelect'
import Container from '../../components/container/Container'
import Pagination from '../../components/Pagination/Pagination'


const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular'); 
  const [config, setConfig] = useState({});


  const handleSelectChange = (value) => {
  setSelectedFilter(value);

  if (value === 'Popular') {
    setConfig({
      params: {
        sortBy: 'rate',
      },
    });
  } else {
    setConfig({});
  }
};

  console.log (selectedFilter)
 
  
  return (
    <>
      <Container>
        <SectionTitle title={title}/>
        <div className={css.box}>
          <p className={css.quantity}> articles</p>
          <div style={{ width: '169px' }}>
            <ArticleListSelect onChange={handleSelectChange}/>
          </div>
        </div>
        <ArticlesList config={config}/>
        <Pagination />
      </Container>
    </>
  )
}




export default ArticlesPage