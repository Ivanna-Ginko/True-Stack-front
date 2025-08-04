import { useEffect, useRef, useState } from 'react';
import ArticlesList from '../ArticlesList/ArticlesList';
import { Loader } from '../Loader/Loader';
import LoadMore from '../LoadMore/LoadMore';
import NothingFound from '../NothingFound/NothingFound';

function PaginatedArticles({
  user,
  totalItems,
  isLoading,
  articles = [],
  loadArticles,
  perPage = 12,
}) {
  const hasSecondPage = totalItems / perPage > 1
  console.log(hasSecondPage);

  return (
    <div>
      {isLoading && !articles.length && <Loader />}
      {articles.length > 0 && (
        <>
          <ArticlesList
            articles={articles}
            user={user}
          />
          {hasSecondPage && <LoadMore
            hasSecondPage={hasSecondPage}
            loadData={loadArticles}
            onDataLoaded={() => {}}
            perPage={perPage}
          />}
        </>
      )}

      {totalItems === 0 && !isLoading && (
        <div className='css.card'>
          <NothingFound
            description='Be the first, who create an article'
            buttonText='Create an article'
            buttonLink='/create'
          />
        </div>
      )}
    </div>
  );
}

export default PaginatedArticles;
