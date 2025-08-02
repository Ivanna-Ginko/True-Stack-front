import css from './LoadMore.module.css';
import Button from '../Button/Button';

const LoadMore = ({ onLoadMore }) => {
  const handleOnClick = (evt) => {
    evt.preventDefault(); 
    onLoadMore();    
  };

  return (
    <div className={ css.loadmore}>
      <Button variant='fill' size='xl' onClick={handleOnClick}>
        Load More
      </Button>
    </div>
  );
};

export default LoadMore;
