import React from 'react';
import css from './LoadMore.module.css';

const LoadMore = ({ onClick, disabled }) => {
  return (
    <div className={css.wrapper}>
      <button
        onClick={onClick}
        className={`${css.button} ${disabled ? css.disabled : ''}`}
        disabled={disabled}
      >        
        {disabled ? 'No more articles' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMore;