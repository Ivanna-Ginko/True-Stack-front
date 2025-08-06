import { useRef, useState } from 'react';
import css from './LoadMore.module.css';
import Button from '../Button/Button';

const LoadMore = ({ loadData, onDataLoaded, perPage = 12 }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  // const containerRef = useRef(null);
  const buttonRef = useRef(null);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     if (containerRef.current) {
  //       containerRef.current.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //       });
  //     }
  //   }, 100);
  // };

  // const scrollToNew = () => {
  //   setTimeout(() => {
  //     // if (containerRef.current) {
  //       buttonRef.current.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //       });
  //     // }
  //   }, 100);
  // };

  const handleClick = async () => {
    if (loading) return;
    const nextPage = page + 1;
    const rect = buttonRef.current.get.getBoundingClientRect()
    //console.log('NExt Page', nextPage);
    setLoading(true);

    try {
      const newItems = await loadData(nextPage);
      //console.log('NEW_ITEM_LENGTH', newItems.length );
      console.log(newItems);
      if (newItems.length < perPage) {
        setHasMore(false);
      }

      onDataLoaded(newItems);
      setPage(nextPage);
      // scrollToBottom();
      scrollToNew()
    } catch (error) {
      console.error('LoadMore error:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // if (!hasMore) return null;

  return (
    <>
      <div
      // ref={containerRef}
      />
      <div className={css.loadmore}>
        {hasMore && (
          <Button
            ref={buttonRef}
            variant='fill'
            size='xl'
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </div>
    </>
  );
};

export default LoadMore;
