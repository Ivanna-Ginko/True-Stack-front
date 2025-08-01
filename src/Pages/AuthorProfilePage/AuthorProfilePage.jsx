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

const AuthorProfilePage = () => {
  const title = "My Profile";
  const { id: userId } = useParams();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const loggedInUserId = user.id;

  const isMyPage = isAuthenticated && loggedInUserId === userId;

  const [authorData, setAuthorData] = useState(null);
  const [articlesAmount, setArticlesAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("My Articles");
  // const [savedArticles, setSavedArticles] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const handleTotalItemsChange = (count) => {
    setTotalItems(count);
    console.log(totalItems);
  };

    const config = {
    params: {
      ownerId: userId,
    },
  };

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        const res = await fetchAuthorById(userId);
        setAuthorData(res.data);
        setArticlesAmount(0);
      } catch (error) {
        console.error("Помилка при отриманні автора", error);
      }
    };
    getAuthorData();
  }, [userId]);


  return (
    <div>
      <Container>
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
          <div></div>
        ) : (
          <ArticlesList config={config} onTotalItemsChange={handleTotalItemsChange} />
        )}
        <LoadMore />
      </Container>
    </div>
  );
};

export default AuthorProfilePage;
