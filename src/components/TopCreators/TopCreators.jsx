import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './TopCreators.module.css';
import AppLink from '../AppLink/AppLink';
import Container from '../container/Container';
import AuthorsList from '../AuthorsList/AuthorsList';
import svg from '../../assets/icons/arrow.svg';
import { fetchAuthors } from '../../services/api';

const TopCreators = () => {
  const [topCreators, setTopCreators] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const getTopCreators = async () =>{
      try {
        const response = await fetchAuthors();        
        setTopCreators(response.data.slice(0, 6));        
      } catch (err) {
        console.log('Error loading TopCreators', err.message);
      }
    };
    getTopCreators();
  }, []);
  
  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };
  
  return (
    <>
      <Container>
        <div className={css.tc_container} id="topCreators">
          <div className= {css.tc_header}>
            <h2 className={css.tc_title}>Top Creators</h2>
            <div className={css.tc_link}>
              <AppLink variant='link' size='lg' to='/authors'>
                Go to all Creators
                <img src={svg} alt="arrow icon" />
              </AppLink>
            </div>
          </div>          
          <AuthorsList
            authors={topCreators}
            imgSize="tc"
            onAuthCardClick={handleAuthorClick}
          />          
        </div>
      </Container>
    </>    
  )
}

export default TopCreators;
