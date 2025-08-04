import 'react-loading-skeleton/dist/skeleton.css';
import s from './ArticlesItemSkeleton.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ArticlesItemSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor='#BCCDCA'
      highlightColor='#A8B3AB'
    >
      <div className={s.card}>
        <Skeleton
          height={233}
          borderRadius={24}
        />

        <div>
          <Skeleton
            count={3}
            style={{ fontSize: 20, marginTop: 8 }}
          />
        </div>

        <div className={s.buttons}>
          <div style={{ flexGrow: 1 }}>
            <Skeleton
              height={40}
              borderRadius={64}
              style={{ flexGrow: 1 }}
            />
          </div>

          <Skeleton
            circle={true}
            width={40}
            height={40}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ArticlesItemSkeleton;
