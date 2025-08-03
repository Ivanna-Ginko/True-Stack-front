import React, { useState, useEffect } from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import css from "./ArticlesList.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { fetchArticles } from "../../services/api.js";
import { Loader } from "../Loader/Loader";
import { toast } from "react-toastify";

const ArticlesList = ({ config, onTotalItemsChange, hideFourthOnDesktop }) => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const articles = await fetchArticles(config);
        setArticleList(articles.data.data);
        console.log(articles.data.data);
        if (onTotalItemsChange) {
          onTotalItemsChange(articles.data.data.totalItems);
        }
      } catch {
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
    getArticles();
  }, [config]);

  const articlesArr = articleList.data;

  return (
    <>
      <ul
        className={`${css.list} ${hideFourthOnDesktop ? css.hideFourth : ""} }`}
      >
        {isLoading && <Loader />}
        {articlesArr &&
          articlesArr.map((article) => {
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
import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import css from "./ArticlesList.module.css";

const ArticlesList = ({ articles, user }) => {
  //${hideFourthOnDesktop ? css.hideFourth : ''}
  return (
    <ul className={`${css.list} `}>
      {Array.isArray(articles) &&
        articles.map((article) => {
          const isAuthor = article.author === user?.user?.id;
          const isSaved = isAuthor && user.savedArticles?.includes(article.id);
          return (
            <ArticlesItem
              key={article._id}
              id={article._id}
              title={article.title}
              author={article.author}
              description={article.description}
              image={article.img}
              isAuthor={isAuthor}
              saved={isSaved}
            />
          );
        })}
    </ul>
  );
};

export default ArticlesList;
