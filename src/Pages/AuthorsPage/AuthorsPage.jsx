import React, { useEffect, useState } from 'react'
import LoadMore from '../../components/LoadMore/LoadMore'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import { useNavigate } from 'react-router-dom';


const AuthorsPage = () => {

  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Помилка при завантаженні авторів:', error);
      }
    };
    fetchAuthors();
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