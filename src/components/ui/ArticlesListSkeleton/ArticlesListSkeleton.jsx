import css from './ArticlesListSkeleton.module.css';
import ArticlesItemSkeleton from '../ArticlesItemSkeleton.jsx/ArticlesItemSkeleton';

const ArticlesListSkeleton = ({ articlesQuantity }) => {
  const articles = Array.from({length: articlesQuantity})



  return (
    <ul className={css.list}>
      {articles.map((_, i) => {
        return (
          <li key={i}>
            <ArticlesItemSkeleton key={i} />
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesListSkeleton;
