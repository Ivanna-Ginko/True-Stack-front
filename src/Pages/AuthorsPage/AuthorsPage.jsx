import React, { useEffect, useState } from 'react'
import LoadMore from '../../components/LoadMore/LoadMore'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import { useNavigate } from 'react-router-dom';
import { fetchAuthors } from '../../services/api';


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
        console.error('Помилка при завантаженні авторів :', error);
      }
    };
    getAuthors();
  }, [])


  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <>
      <AuthorsList authors={authors} onAuthCardClick={handleAuthorClick} />
      <LoadMore />
    </>
  )
}

export default AuthorsPage