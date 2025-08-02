import React, { useState, useEffect } from 'react'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import css from './ArticlesPage.module.css'
import ArticleListSelect from '../../components/ArticleListSelect/ArticleListSelect'
import Container from '../../components/container/Container'
import LoadMore from '../../components/LoadMore/LoadMore'


const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular'); 
  const [config, setConfig] = useState({});
  console.log(selectedFilter)
  const [totalItems, setTotalItems] = useState(0);

  const handleSelectChange = (value) => {
  setSelectedFilter(value);
};

  useEffect(() => {
  if (selectedFilter === 'Popular') {
    setConfig({
      params: { sortBy: 'rate' },
    });
  } else {
    setConfig({});
  }
}, [selectedFilter]);

const handleTotalItemsChange = (count) => {
  setTotalItems(count);
};

//рендеримо список
  return (
    <>
      <Container>
        <SectionTitle title={title}/>
        <div className={css.box}>
          <p className={css.quantity}>{totalItems} articles</p>
          <div style={{ width: '169px' }}>
            <ArticleListSelect onChange={handleSelectChange}/>
          </div>
        </div>
        <ArticlesList config={config} onTotalItemsChange={handleTotalItemsChange}/>
        <LoadMore />
      </Container>
    </>
  )
}




export default ArticlesPage