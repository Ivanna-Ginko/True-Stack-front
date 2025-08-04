import React, { useEffect, useState} from 'react'
import BlogCard from '../BlogCard/BlogCard'
import { fetchArticles } from '../../services/api';
import toast from 'react-hot-toast';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './YouCanAlsoInterested.module.css'
import { Loader } from '../Loader/Loader';
import AppLink from '../AppLink/AppLink';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';

const YouCanAlsoInterested = ({ id, isSaved = false, config, author, publishDate, idAuthor, hideFourth}) => {
const [articlesList, setArticlesList] = useState([]);
const [saved, setSaved] = useState(isSaved);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);

const handleToggle = () => setSaved(!saved);

useEffect(() => {
const getArticles = async () => {
    try {
    setIsLoading(true);
    const articles = await fetchArticles(config);
    setArticlesList(articles.data.data.data);
    } catch (error) {
    setIsError(true);
    toast.error('Please, try again: ' + error.message);
    } finally {
    setIsLoading(false);
    }
};

getArticles();
}, [config]);
const user = useSelector(selectUser);
const formatDate = (dateStr) => {
if (!dateStr || typeof dateStr !== 'string') return '';
const [year, month, day] = dateStr.split('-');
return `${day}.${month}.${year}`;
};

const isAuthor = user && user.id === idAuthor;
return (
<div>
    {isError && <p className={s.error}>Something went wrong. Please try again later.</p>}
    <div className={s.body}>
    <div className={s.topBody}>
        <p className={s.containerParagraph}>
            <span className={s.span}>Author:</span>{' '}
            {isLoading ? (
                <Loader variant="skeleton" small inline />
            ) : (
                <div className={s.containerLink}>
                    <AppLink size='md' to={`/authors/${idAuthor}`} variant="link" className={s.linkOverride}>
                        <span className={s.spanAuthor}>{author}</span>
                    </AppLink>
                </div>
            )}
        </p>
        <p><span className={s.span}>Publication date:</span> {isLoading ? (<Loader variant="skeleton" small inline/>) : formatDate(publishDate)}</p> 
        <h3>You may also be interested</h3>
    </div>
    <ul className={`${s.list} ${hideFourth ? s.hideFourth : ''}`}>
        {isLoading ? (
            [1, 2, 3].map(i => (
            <li key={i} className={s.listStyle}>
                <Loader variant="skeleton" small inline />
            </li>
            ))
        ) : (
            articlesList.map(article => (
            <BlogCard
                key={article._id}
                title={article.title}
                author={article.author}
                linkId={article._id}
            />
            ))
        )}
    </ul>


    </div>
    {user && !isAuthor && (<ButtonAddToBookmarks 
        articleId={id} 
        onUpdate={handleToggle}
            variant={saved ? "saved" : 'default'}
            isWideStyle={true}
    />)}
</div>
);
};

export default YouCanAlsoInterested;
