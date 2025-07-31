import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard'
import { fetchArticles } from '../../services/api';
import toast from 'react-hot-toast';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './YouCanAlsoInterested.module.css'
import { Loader } from '../Loader/Loader';

const YouCanAlsoInterested = ({ id, isSaved = false, config, author, publishDate }) => {
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

const formatDate = (dateStr) => {
if (!dateStr || typeof dateStr !== 'string') return '';
const [year, month, day] = dateStr.split('-');
return `${day}.${month}.${year}`;
};
//add btn change
return (
<div>
    {isError && <p className={s.error}>Something went wrong. Please try again later.</p>}
    <div className={s.body}>
    <div className={s.topBody}>
        <p><span className={s.span}>Author:</span> <span className={s.spanAuthor}>{author}</span></p>
        <p><span className={s.span}>Publication date:</span> {formatDate(publishDate)}</p>
        <h3>You may also be interested</h3>
    </div>
    <ul className={s.list}>
        {isLoading ? <Loader /> : articlesList.map(article => (
        <BlogCard key={article._id} title={article.title} author={article.author} linkId={article._id} />
        ))}
    </ul>
    </div>
    <ButtonAddToBookmarks articleId={id} onClick={handleToggle} />
</div>
);
};

export default YouCanAlsoInterested;
