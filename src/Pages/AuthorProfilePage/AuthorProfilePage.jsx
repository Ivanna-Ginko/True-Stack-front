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

const AuthorProfilePage = () => {
  const title = "My Profile";
  const { id: userId } = useParams();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const loggedInUserId = user.id;

  const isMyPage = isAuthenticated && loggedInUserId === userId;

  const [authorData, setAuthorData] = useState(null);
  const [articlesAmount, setArticlesAmount] = useState(0);

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
        {isMyPage ? <SectionTitle title={title} /> : null}
        {authorData && (
          <div className={s.aboutAuthor}>
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
        <ArticlesList />
        <LoadMore />
      </Container>
    </div>
  );
};

export default AuthorProfilePage;
