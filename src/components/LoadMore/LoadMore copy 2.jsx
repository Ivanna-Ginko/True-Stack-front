import { useRef, useState } from 'react';
import css from './LoadMore.module.css';
import Button from '../Button/Button';

const LoadMore = ({ loadData, onDataLoaded, perPage }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClick = async () => {
    if (loading) return;
    const nextPage = page + 1;
    setLoading(true);

    try {
      const newItems = await loadData(nextPage);
      if (newItems.length < perPage) {
        setHasMore(false);
      }
      onDataLoaded(newItems);
      setPage(nextPage);
      scrollToBottom();
    } catch (error) {
      console.error('LoadMore error:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMore) return null;

  return (
    <>
      <div ref={containerRef} />
      <div className={css.loadmore}>
        <Button onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </>
  );
};

export default LoadMore;