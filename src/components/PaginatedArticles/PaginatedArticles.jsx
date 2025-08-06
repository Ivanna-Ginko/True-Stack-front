import ArticlesList from "../ArticlesList/ArticlesList";
import { Loader } from "../Loader/Loader";
import LoadMore from "../LoadMore/LoadMore";
import NothingFound from "../NothingFound/NothingFound";
import s from "../../Pages/AuthorProfilePage/AuthorProfilePage.module.css";

function PaginatedArticles({
  user,
  totalItems,
  isLoading,
  articles = [],
  loadArticles,
  perPage = 12,
  selectedTab,
  isFirstLoadFinished,
  isMyPage,
  refresh
}) {
  const hasSecondPage = totalItems / perPage > 1;
  // console.log(hasSecondPage);
  // console.log(articles.length);

  return (
    <div>
      {isLoading && !articles.length && <Loader />}
      {articles.length > 0 && (
        <>
          <ArticlesList articles={articles} user={user} refresh={refresh} />
          {hasSecondPage && (
            <LoadMore
              loadData={loadArticles}
              onDataLoaded={() => {}}
              perPage={perPage}
              
            />
          )}
        </>
      )}
      {isMyPage && (
        <>
          {totalItems === 0 &&
            isFirstLoadFinished &&
            selectedTab === "My Articles" && (
              <div className={s.nothing}>
                <NothingFound
                  description="Write your first article"
                  buttonText="Create an article"
                  buttonLink="/create"
                />
              </div>
            )}

          {totalItems === 0 &&
            isFirstLoadFinished &&
            selectedTab === "Saved Articles" && (
              <div className={s.nothing}>
                <NothingFound
                  description="Save your first article"
                  buttonText="Go to articles"
                  buttonLink="/articles"
                />
              </div>
            )}
        </>
      )}
    </div>
  );
}

export default PaginatedArticles;
