import React, { useState, useEffect } from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { getSavedArticles } from "../../services/api";
import toast from "react-hot-toast";
import s from "./SavedArticlesList.module.css";

const SavedArticlesList = ({
  selectedTab,
  onTotalItemsChange,
  hideFourthOnDesktop,
}) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const articles = await getSavedArticles();
        setSavedArticles(articles.items);
        if (onTotalItemsChange) {
          onTotalItemsChange(articles.totalItems);
          console.log(articles.item);
        }
      } catch {
        toast.error("Failed to load saved articles");
      }
    };
    if (selectedTab === "Saved Articles") {
      fetchSaved();
    }
  }, [selectedTab]);

  if (selectedTab === "Saved Articles" && savedArticles.length === 0) {
    return <p className={s.empty}>You haven’t saved any articles yet.</p>;
  }
  return (
    <>
      <ul className={`${s.list} ${hideFourthOnDesktop ? s.hideFourth : ""} }`}>
        {!savedArticles && <p>wait....</p>}
        {savedArticles &&
          savedArticles.map((article) => {
            const isAuthor = article.author === user?.user?.id;
            const isSaved =
              isAuthor && user.savedArticles?.includes(article.id);
            return (
              <ArticlesItem
                key={article._id}
                id={article._id}
                title={article.title}
                author={article.author}
                description={article.title}
                image={article.img}
                isAuthor={isAuthor}
                saved={isSaved}
              />
            );
          })}
      </ul>
    </>
  );
};

export default SavedArticlesList;
