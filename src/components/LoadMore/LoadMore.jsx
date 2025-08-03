import css from './LoadMore.module.css';
import Button from '../Button/Button';
import { useRef } from 'react';

const LoadMore = ({ onLoadMore, hasMore }) => {
  const scrollRef = useRef(null);

  const handleOnClick = async () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    await onLoadMore();
  };
  if (!hasMore) return null;

  return (
    <>      
      <div ref={scrollRef}></div>
      <div className={css.loadmore}>
        <Button variant="fill" size="xl" onClick={handleOnClick}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default LoadMore;
