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
  try {
    const data = await fetchAuthors(page, perPage);
    const timestamp = Date.now();
    const normalizedAuthors = data.data.map((item) => {
      const id = item._id?.$oid || item._id;
      return {
        ...item,
        _id: id,
        _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
      };
    });
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
  }
};

  useEffect(() => {
  setIsLoading(true);
  loadAuthors(1).then((initialAuthors) => {
    setAuthors(initialAuthors);
    setIsLoading(false);
  });
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
          {!isLoading && <LoadMore
            loadData={loadAuthors}
            onDataLoaded={(newItems) => {
              setAuthors(prev => [...prev, ...newItems]);
            }}
            perPage={perPage}
          />
          }
        </>
        }
        {!authors &&
          <div>
            <p>Авторів не знайдено</p>
          </div>}  
    </Container>
    </>
  )
}

export default AuthorsPage;
