import React, { lazy, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import css from './HomePage.module.css';
// import { useSelector } from 'react-redux'
// import { selectUser } from '../../redux/selectors'
import Hero from '../../components/Hero/Hero';
// import About from '../../components/About/About';
// import PopularArticles from '../../components/PopularArticles/PopularArticles';
// import TopCreators from '../../components/TopCreators/TopCreators';

const About = lazy(() => import('../../components/About/About'));
const PopularArticles = lazy(() =>
  import('../../components/PopularArticles/PopularArticles')
);
const TopCreators = lazy(() =>
  import('../../components/TopCreators/TopCreators')
);

const HomePage = () => {
  // const user = useSelector(selectUser)
  const [isAboutLoaded, setIsAboutLoaded] = useState(false);
  const [isPopularArticlesLoaded, setIsPopularArticlesLoaded] = useState(false);
  const [isTopCreatorsLoaded, setIsTopCreatorsLoaded] = useState(false);

  const [aboutRef, isAboutInView, aboutEntry] = useInView({
    rootMargin: '100px 0px',
  });
  const { ref: popularArticlesRef, inView: isPopularArticlesInView } =
    useInView({
      rootMargin: '100px 0px',
    });
  const { ref: topCreatorsRef, inView: isTopCreatorsInView } = useInView({
    rootMargin: '100px 0px',
  });

  useEffect(() => {
    if (isAboutInView) setIsAboutLoaded(true);
  }, [aboutRef, isAboutInView, aboutEntry]);

  useEffect(() => {
    if (isPopularArticlesInView) setIsPopularArticlesLoaded(true);
  }, [isPopularArticlesInView]);

  useEffect(() => {
    if (isTopCreatorsInView) setIsTopCreatorsLoaded(true);
  }, [isTopCreatorsInView]);

  return (
    <>
      {/* User Info Test Block */}
      {/* {user && user.id && (
        <div style={{ background: '#f0f0f0', padding: 16, marginBottom: 16, borderRadius: 8 }}>
          <strong>User Info:</strong><br />
          <span>ID: {user.id}</span><br />
          <span>Name: {user.name}</span><br />
          {user.avatarUrl && (
            <img src={user.avatarUrl} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginTop: 8 }} />
          )}
        </div>
      )} */}
      <Hero />

      <div
        ref={aboutRef}
        className={css.aboutContainer}
      >
        {isAboutLoaded && <About />}
      </div>

      <div
        id='popularArticles'
        ref={popularArticlesRef}
        className={css.popularArticlesContainer}
      >
        {isPopularArticlesLoaded && <PopularArticles />}
      </div>

      <div
        id='topCreators'
        ref={topCreatorsRef}
        className={css.topCreatorsContainer}
      >
        {isTopCreatorsLoaded && <TopCreators />}
      </div>

      {/* <About />
      <PopularArticles />
      <TopCreators /> */}
    </>
  );
};

export default HomePage;
