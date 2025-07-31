import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/container/Container';
import YouCanAlsoInterested from '../../components/YouCanAlsoInterested/YouCanAlsoInterested';
import { fetchArticleById } from '../../services/api';
import { Loader } from '../../components/Loader/Loader';
import s from './ArticlePage.module.css';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const config = {
    params: {
      sortBy: 'rate',
      perPage: 3
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetchArticleById(id);
        setArticle(response.data.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticle();
  }, [id]);

  if (isLoading) return <Loader />;
  if (isError || !article) return <p className={s.error}>Error loading article</p>;

  return (
    <Container>
      <h2 className={s.title}>{article.title}</h2>
      <img src={article.img} alt={article.title} className={s.image} />
      <p className={s.articleText}>{article.article}</p>

      <YouCanAlsoInterested
        id={id}
        config={config}
        author={article.author}
        publishDate={article.date}
      />
    </Container>
  );
};

export default ArticlePage;
