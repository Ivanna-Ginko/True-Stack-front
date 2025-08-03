import React, { useEffect, useState } from 'react'
import LoadMore from '../../components/LoadMore/LoadMore_orig'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import { useNavigate } from 'react-router-dom';
import { fetchAuthors } from '../../services/api';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Loader } from '../../components/Loader/Loader'
import { toast } from 'react-toastify';

const PER_PAGE = 20;

const AuthorsPage = () => {

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalAuthors, setTotalAuthors] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getAuthors = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAuthors(page, PER_PAGE);
        console.log('API response:', data);
        // const normalizedAuthors = data.data.map((item) => ({
        //   ...item,
        //   _id: item._id?.$oid || item._id,
        // }));
        const normalized = data.data.map((item) => ({
          ...item,
          _id: item._id?.$oid || item._id,
        }));        
        // setAuthors(normalizedAuthors);
        setAuthors(prev =>
          page === 1 ? normalized : [...prev, ...normalized]
        );
        console.log('total author:',data.pagination.totalItems);
        setTotalAuthors(data.pagination.totalItems);
      } catch (error) {
        setIsError(true);
        toast.warning('No authors found', {
          style: {
            backgroundColor: 'rgba(209, 224, 216, 1)',
            color: '#333',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAuthors();
  }, [page]);


  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = authors.length < totalAuthors;

  return (
    <>
    <Container>
      <SectionTitle  title = {'Authors'}/>
      {isLoading && <Loader/>}
      { authors &&  
            <>
            <AuthorsList authors={authors} onAuthCardClick={handleAuthorClick} />
            <LoadMore onLoadMore={handleLoadMore} hasMore={hasMore} />
            </>    
      }
      
    </Container>
    </>
  )
}

export default AuthorsPage