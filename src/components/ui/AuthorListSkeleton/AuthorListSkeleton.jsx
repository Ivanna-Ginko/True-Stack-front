import AuthorItemSkeleton from '../AuthorItemSkeleton/AuthorItemSkeleton';
import css from './AuthorListSkeleton.module.css';

function AuthorListSkeleton({ authorsQuantity }) {
  const authors = Array.from({ length: authorsQuantity });

  return (
    <ul className={css.list}>
      {authors.map((_, i) => (
        <li key={i}>
          <AuthorItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

export default AuthorListSkeleton;
