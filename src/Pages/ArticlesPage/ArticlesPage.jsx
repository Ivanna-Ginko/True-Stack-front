import React, { useState, useEffect } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import css from './ArticlesPage.module.css';
import ArticleListSelect from '../../components/ArticleListSelect/ArticleListSelect';
import Container from '../../components/container/Container';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { fetchArticles } from '../../services/api.js';
import { Loader } from '../../components/Loader/Loader'; // ✅ не забудь импорт
import NothingFound from '../../components/NothingFound/NothingFound.jsx'

const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular');
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedFilter(value);
  };

  const user = useSelector(selectUser);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const config = selectedFilter === 'Popular'
          ? { params: { sortBy: 'rate' } }
          : {};
        const response = await fetchArticles(config);
        setArticleList(response.data.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [selectedFilter]);

  const articlesArr = articleList?.data || [];
  const totalItems = articleList?.totalItems || 0;

  return (
    <Container>
      <SectionTitle title={title} />
      <div className={css.box}>
        <p className={css.quantity}>{totalItems} articles</p>
        <div style={{ width: '169px' }}>
          <ArticleListSelect onChange={handleSelectChange} />
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && articlesArr.length > 0 && (
        <>
          <ArticlesList articles={articlesArr} user={user} />
          <LoadMore />
        </>
      )}

      {!isLoading && totalItems === 0 && (
          <div className='css.card'>
              <NothingFound
              description="Be the first, who create an article"
              buttonText="Create an article"
              buttonLink="/create"
              />
          </div>
        )}
    </Container>
  );
};

export default ArticlesPage;