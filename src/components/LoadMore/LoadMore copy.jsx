import css from './LoadMore.module.css';
import Button from '../Button/Button';

const LoadMore = ({ onLoadMore, hasMore }) => {
  const handleOnClick = async (evt) => {
    evt.preventDefault();
    await onLoadMore();
  };

  if (!hasMore) return null;

  return (
    <div className={css.loadmore}>
      <Button variant="fill" size="xl" onClick={handleOnClick}>
        Load More
      </Button>
    </div>
  );
};

export default LoadMore;
