import React, { useEffect, useState } from "react";
import s from "./AuthorProfilePage.module.css";
import LoadMore from "../../components/LoadMore/LoadMore";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import Container from "../../components/container/Container";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import {
  fetchArticles,
  fetchAuthorById,
  getSavedArticles,
} from "../../services/api";
import { selectIsLoggedIn, selectUser } from "../../redux/selectors";
import { ProfileTabs } from "../../components/ProfileTabs/ProfileTabs";
import NothingFound from "../../components/NothingFound/NothingFound.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";

const AuthorProfilePage = () => {
  const title = "My Profile";
  const { id: userId } = useParams();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const loggedInUserId = user.id;

  const isMyPage = isAuthenticated && loggedInUserId === userId;

  const [isLoading, setIsLoading] = useState(false);
  const [authorData, setAuthorData] = useState(null);
  const [createdArticles, setCreatedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [selectedTab, setSelectedTab] = useState("My Articles");
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsSaved, setTotalItemsSaved] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSavedPages, setTotalSavedPages] = useState(1);
  const [isError, setIsError] = useState(false);

  const isSavedTab = selectedTab === "Saved Articles";
  const perPage = 12;

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetchAuthorById(userId);
        setAuthorData(res.data);
      } catch (error) {
        setIsError(true);
        toast.warning("No author found", {
          style: {
            backgroundColor: "rgba(209, 224, 216, 1)",
            color: "#333",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAuthorData();
  }, [userId]);

  useEffect(() => {
    const getInitialArticles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const config = {
          params: {
            page: 1,
            perPage: perPage,
            ownerId: userId,
          },
        };

        const res = await fetchArticles(config);
        const fetched = res.data?.data || [];

        const timestamp = Date.now();
        const normalized = fetched.map((item) => {
          const id = item._id?.$oid || item._id;
          return {
            ...item,
            _id: id,
            _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
          };
        });

        setCreatedArticles(normalized);
        setTotalItems(res.data?.totalItems || 0);
        setTotalPages(res.data?.totaPage || 1);
      } catch (error) {
        setIsError(true);
        toast.warning("No articles found", {
          style: {
            backgroundColor: "rgba(209, 224, 216, 1)",
            color: "#333",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!isSavedTab) getInitialArticles();
  }, [userId, selectedTab]);

  const loadArticles = async (page) => {
    const config = { params: { page, perPage: perPage } };
      const timestamp = Date.now();
    try {
      if (isSavedTab) {
        const res = await getSavedArticles(config);
        const fetched = res.data || [];
        
        const normalized = fetched.map((item) => {
          const id = item._id?.$oid || item._id;
          return {
            ...item,
            _id: id,
            _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
          };
        });

        if (page === 1) {
          setSavedArticles(normalized);
        }

        setTotalItemsSaved(res.pagination?.totalItems || 0);
        setTotalSavedPages(res.pagination?.totalPage || 1);

        return normalized;
      } else {
        const res = await fetchArticles({
          ...config,
          params: { ...config.params, ownerId: userId },
        });

        const fetched = res.data?.data || [];
        
        const normalized = fetched.map((item) => {
          const id = item._id?.$oid || item._id;
          return {
            ...item,
            _id: id,
            _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
          };
        });

        return normalized;
      }
    } catch (error) {
      toast.warning("Error loading articles");
      return [];
    }
  };

  const handleAppend = (newData) => {
    if (isSavedTab) {
      setSavedArticles((prev) => [...prev, ...newData]);
    } else {
      setCreatedArticles((prev) => [...prev, ...newData]);
    }
  };

  return (
    <div>
      <Container>
        {isLoading && <Loader />}
        <div className={s.box}>
          {isMyPage ? <SectionTitle title={title} /> : null}
          {authorData && (
            <div
              className={`${s.aboutAuthor} ${
                !isMyPage ? s.aboutAuthorShifted : ""
              }`}
            >
              <img
                className={s.authorAvatar}
                src={authorData.avatarUrl || null}
                alt={`Фото автора ${authorData.name}`}
              />
              <div className={s.authorInfo}>
                <h2 className={s.authorName}>{authorData.name}</h2>
                <p className={s.articlesAmount}>{totalItems} articles</p>
              </div>
            </div>
          )}
          {isMyPage ? (
            <ProfileTabs
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
          ) : null}
        </div>
        <div className={s.container}>
          {isMyPage ? (
            <>
              {selectedTab === "My Articles" && (
                <>
                  <ArticlesList articles={createdArticles} user={user} />
                  {totalItems === 0 && (
                    <div className={s.nothing}>
                      <NothingFound
                        description="Write your first article"
                        buttonText="Create an article"
                        buttonLink="/create"
                      />
                    </div>
                  )}
                  {totalPages > 1 && (
                    <LoadMore
                      loadData={loadArticles}
                      onDataLoaded={handleAppend}
                      perPage={perPage}
                    />
                  )}
                </>
              )}

              {selectedTab === "Saved Articles" && (
                <>
                  <ArticlesList articles={savedArticles} user={user} />
                  {totalItemsSaved === 0 && (
                    <div className={s.nothing}>
                      <NothingFound
                        description="Save your first article"
                        buttonText="Go to articles"
                        buttonLink="/articles"
                      />
                    </div>
                  )}
                  {totalSavedPages > 1 && (
                    <LoadMore
                      loadData={loadArticles}
                      onDataLoaded={handleAppend}
                      perPage={perPage}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <ArticlesList articles={createdArticles} user={user} />
              {totalPages > 1 && (
                  <LoadMore
                    loadData={loadArticles}
                    onDataLoaded={handleAppend}
                    perPage={perPage}
                  />
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AuthorProfilePage;