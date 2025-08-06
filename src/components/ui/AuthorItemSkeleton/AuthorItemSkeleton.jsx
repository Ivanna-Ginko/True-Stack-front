import 'react-loading-skeleton/dist/skeleton.css';
import css from './AuthorItemSkeleton.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const AuthorItemSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor='#BCCDCA'
      highlightColor='#A8B3AB'
    >
      <div className={css.itemwrapper}>
        <div className={css.img}>
          <Skeleton
            height='100%'
            circle={true}
          />
        </div>

        <p className={css.text}>
          <Skeleton />
        </p>
      </div>
    </SkeletonTheme>
  );
};

export default AuthorItemSkeleton;
