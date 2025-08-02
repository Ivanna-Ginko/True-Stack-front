import React, { useEffect, useState } from "react";
import s from "./AuthorProfilePage.module.css";
import LoadMore from "../../components/LoadMore/LoadMore";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import Container from "../../components/container/Container";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import { fetchAuthorById } from "../../services/api";
import { selectIsLoggedIn, selectUser } from "../../redux/selectors";
import { ProfileTabs } from "../../components/ProfileTabs/ProfileTabs";
import NothingFound from "../../components/NothingFound/NothingFound.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import ProfileArticlesList from "../../components/ProfileArticlesList/ProfileArticlesList.jsx";

const AuthorProfilePage = () => {
  const title = "My Profile";
  const { id: userId } = useParams();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const loggedInUserId = user.id;

  const isMyPage = isAuthenticated && loggedInUserId === userId;

  const [isLoading, setIsLoading] = useState(false);
  const [authorData, setAuthorData] = useState(null);
  const [articlesAmount, setArticlesAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("My Articles");
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsSaved, setTotalItemsSaved] = useState(0);

  const handleTotalItemsChange = (count) => {
    setTotalItems(count);
  };
  const handleSavedTotalItemsChange = (count) => {
    setTotalItemsSaved(count);
  };

  const config = {
    params: {
      ownerId: userId,
    },
  };

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchAuthorById(userId);
        setAuthorData(res.data);
        setArticlesAmount(totalItems);
      } catch (error) {
        console.error("Помилка при отриманні автора", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAuthorData();
  }, [userId, totalItems]);

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
                src={authorData.avatarUrl}
                alr={`Фото автора ${authorData.name}`}
              />
              <div className={s.authorInfo}>
                <h2 className={s.authorName}>{authorData.name}</h2>
                <p className={s.articlesAmount}>{articlesAmount} articles</p>
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
        {isMyPage ? (
          <>
            {selectedTab === "My Articles" && (
              <>
                <ArticlesList
                  config={config}
                  onTotalItemsChange={handleTotalItemsChange}
                />
                {totalItems === 0 && (
                  <div className={s.nothing}>
                    <NothingFound
                      description="Write your first article"
                      buttonText="Create an article"
                      buttonLink="/create"
                    />
                  </div>
                )}
              </>
            )}

            {selectedTab === "Saved Articles" && (
              <>
                <ProfileArticlesList
                  selectedTab={selectedTab}
                  onTotalItemsChange={handleSavedTotalItemsChange}
                />
                {totalItemsSaved === 0 && (
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
          </>
        ) : (
          <ArticlesList
            config={config}
            onTotalItemsChange={handleTotalItemsChange}
          />
        )}
        <LoadMore />
      </Container>
    </div>
  );
};

export default AuthorProfilePage;
