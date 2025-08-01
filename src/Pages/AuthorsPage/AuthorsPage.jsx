import React, { useEffect, useState } from 'react'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import { useNavigate } from 'react-router-dom';
import { fetchAuthors } from '../../services/api';
import Pagination from '../../components/Pagination/Pagination';
import Container from '../../components/container/Container';
import css from './AuthorsPage.module.css';



const AuthorsPage = () => {

  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const data = await fetchAuthors();

        console.log('API response:', data);

        const normalizedAuthors = data.data.map((item) => ({
          ...item,
          _id: item._id?.$oid || item._id,
        }));

        setAuthors(normalizedAuthors);
      } catch (error) {
        console.error('Помилка при завантаженні авторів:', error);
      }
    };
    getAuthors();
  }, [])


  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <>
      <Container>
        <h1 className={css.title}>Authors</h1>

        <AuthorsList authors={authors} onAuthCardClick={handleAuthorClick} />

        <Pagination />
      </Container>
    </>
  )
}

export default AuthorsPage