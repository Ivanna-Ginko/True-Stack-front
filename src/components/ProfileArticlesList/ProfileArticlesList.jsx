import React, { useState, useEffect } from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem.jsx'
import css from '../ArticlesList/ArticlesList.module.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors.js'
import { Loader } from '../Loader/Loader.jsx'
import { getSavedArticles } from '../../services/api.js'



const ProfileArticlesList = ({ selectedTab, onTotalItemsChange, hideFourthOnDesktop }) => {
	const [savedArticles, setSavedArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const user = useSelector(selectUser)

  useEffect(() => {
    const fetchSaved = async () => {
      if (selectedTab === "Saved Articles") {
        try {
          setIsLoading(true);
          const response = await getSavedArticles();
          setSavedArticles(response.data);
          onTotalItemsChange(response.pagination.totalItems)
        } catch (error) {
          console.error("Помилка при завантаженні збережених статей", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSaved();
  }, [selectedTab]);

 
	return (
		<>
				<ul className={`${css.list} ${hideFourthOnDesktop ? css.hideFourth : ''}`}>
					{isLoading && <Loader/>}
					{savedArticles && 
						savedArticles.map(article => {
							const isAuthor = article.author === user?.user?.id;
							const isSaved = isAuthor && user.savedArticles?.includes(article.id);
								return (
								<ArticlesItem
									key={article._id}
									id={article._id}
									title={article.title}
									author={article.author}
									description={article.title}
									image={article.img}
									isAuthor = {isAuthor}
									saved = {isSaved}
									/>
						)}
					)}
				</ul>
		</>
	)
}

export default ProfileArticlesList;



