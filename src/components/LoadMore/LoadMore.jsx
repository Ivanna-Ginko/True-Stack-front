import React from 'react';
import css from './LoadMore.module.css';

const LoadMore = ({ onClick, disabled }) => {
  return (
    <div className={css.wrapper}>
      <button className={css.button} onClick={onClick} disabled={disabled}>
        {/* {disabled ? 'Loading...' : 'Load More'} */}
        Load More
      </button>
    </div>
  );
};

export default LoadMore;