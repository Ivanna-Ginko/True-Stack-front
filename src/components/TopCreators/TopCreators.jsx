import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './TopCreators.module.css';
import AppLink from '../AppLink/AppLink';
import Container from '../container/Container';
import AuthorsList from '../AuthorsList/AuthorsList';
import svg from '../../assets/icons/arrow.svg';
import { fetchAuthors } from '../../services/api';
import { Loader } from '../Loader/Loader';
import AuthorListSkeleton from '../ui/AuthorListSkeleton/AuthorListSkeleton';

const TopCreators = () => {
  const [topCreators, setTopCreators] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getTopCreators = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAuthors();
        setTopCreators(response.data.slice(0, 6));
      } catch (err) {
        console.log('Error loading TopCreators', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTopCreators();
  }, []);

  const handleAuthorClick = authorId => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <>
      <Container>
        <div
          className={css.tc_container}
          id='topCreators'
        >
          <div className={css.tc_header}>
            <h2 className={css.tc_title}>Top Creators</h2>
            <div className={css.tc_link}>
              <AppLink
                variant='link'
                size='lg'
                to='/authors'
              >
                Go to all Creators
                <img
                  src={svg}
                  alt='arrow icon'
                />
              </AppLink>
            </div>
          </div>
          {isLoading ? (
            // <Loader
            //   small
            //   className={css.loader}
            // />
            <AuthorListSkeleton authorsQuantity={6}/>
          ) : (
            <AuthorsList
              authors={topCreators}
              imgSize='tc'
              onAuthCardClick={handleAuthorClick}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default TopCreators;
