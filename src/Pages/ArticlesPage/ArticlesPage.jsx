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
  //const [articleList, setArticleList] = useState([]);
  const [articleList, setArticleList] = useState({ data: [], totalPage: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedFilter(value);
  };

  const user = useSelector(selectUser);
  const perPage = 12;

  const loadArticles = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const config = {
        params: {
          page,
          perPage,
          ...(selectedFilter === 'Popular' && { sortBy: 'rate' }),
        },
      };

      const res = await fetchArticles(config);
      const fetched = res.data.data.data;
      const totalItems = res.data.data.totalItems;

      // const normalizedArticles = fetched.map(item => ({
      //   ...item,
      //   _id: item._id?.$oid || item._id,
      // }));
      
      // const normalizedArticles = fetched.map((item) => {
      //   const id = item._id?.$oid || item._id;
      //   return {
      //     ...item,
      //     _id: `${id}__page${page}`,
      //     _realId: id,
      //   };
      // });

      // const normalizedArticles = fetched.map((item) => {
      //   const id = item._id?.$oid || item._id;
      //     return {
      //       ...item,
      //       _id: `${id}__${Math.random().toString(36).slice(2, 10)}`,
      //       _realId: id,
      //     };
      // });

      const timestamp = Date.now();
      const normalizedArticles = fetched.map((item) => {
        const id = item._id?.$oid || item._id;
        return {
          ...item,
          _id: id,
          _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
        };
      });      

      if (page === 1) {        
        setArticleList({ data: normalizedArticles, totalItems });
      } else {        
        setArticleList(prev => ({
          data: [...prev.data, ...normalizedArticles],
          totalItems: prev.totalItems,
        }));
      }

      return normalizedArticles;
    } catch (error) {
      setIsError(true);
      toast.warning('No articles found', {
        style: {
          backgroundColor: 'rgba(209, 224, 216, 1)',
          color: '#333',
        },
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(1);
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
          <LoadMore
            loadData={loadArticles}
            onDataLoaded={() => {}}
            perPage={perPage}
          />
        </>
      )}

      {totalItems === 0 && (
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