import React, { useEffect, useState } from 'react'
import LoadMore from '../../components/LoadMore/LoadMore'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import { useNavigate } from 'react-router-dom';
import { fetchAuthors } from '../../services/api';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Loader } from '../../components/Loader/Loader'
import { toast } from 'react-toastify';

const AuthorsPage = () => {

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const perPage = 20;

  const loadAuthors = async (page) => {
    setIsLoading(true);

    try {
      const data = await fetchAuthors(page, perPage);
      const normalizedAuthors = data.data.map((item) => ({
        ...item,
        _id: item._id?.$oid || item._id,
      }));

      if (page === 1) {
        setAuthors(normalizedAuthors);
      } else {
        setAuthors(prev => [...prev, ...normalizedAuthors]);
      }
      return normalizedAuthors;
    } catch (error) {
      setIsError(true);
      toast.warning('No authors found', {
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
    loadAuthors(1);
  }, []);

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };
  return (
    <>
    <Container>
      <SectionTitle  title = {'Authors'}/>
      {isLoading && <Loader/>}
      { authors &&  
        <>
          <AuthorsList authors={authors} onAuthCardClick={handleAuthorClick} />
          <LoadMore 
            loadData={loadAuthors}
            onDataLoaded={() => {}}
            perPage={perPage}
          />
        </>
      }      
    </Container>
    </>
  )
}

export default AuthorsPage;
