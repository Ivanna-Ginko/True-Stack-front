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
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader'; // ✅ не забудь импорт
import NothingFound from '../../components/NothingFound/NothingFound.jsx'

const ArticlesPage = () => {
  const title = 'Articles';
  const [selectedFilter, setSelectedFilter] = useState('Popular');
  //const [articleList, setArticleList] = useState([]);
  const [articleList, setArticleList] = useState({ data: [], totalPage: 1 });
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
        
      } catch (error) {
        setIsError(true);
        toast.warning('No articles found', {
          style: {
            backgroundColor: 'rgba(209, 224, 216, 1)',
            color: '#333',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [selectedFilter]);

  const loadArticles = async (page) => {
    const res = await fetchArticles({ params: { page, perPage: 12 } });
    return res.data.data.data; 
  };

  const handleAppendArticles = (newArticles) => {
    setArticleList(prev => ({
      ...prev,
      data: [...prev.data, ...newArticles],
    }));
  };

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
          <LoadMore loadData={loadArticles} onDataLoaded={handleAppendArticles} />
        </>
      )}

      {!isLoading && !articlesArr.length && !isError && (
        <NothingFound/>
      )}
    </Container>
  );
};

export default ArticlesPage;