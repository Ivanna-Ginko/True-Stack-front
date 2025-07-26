import React from 'react'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import css from './ArticlesPage.module.css'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import Container from '../../components/container/Container'


const ArticlesPage = () => {
  const title = 'Articles';
  

  return (
    <>
      <Container>
        <SectionTitle title={title}/>
        <div className={css.box}>
          <p className={css.quantity}>?? articles</p>
          <div style={{ width: '169px' }}>
            <CustomSelect />
          </div>
        </div>
        <ArticlesList />
      </Container>
    </>
  )
}



export default ArticlesPage