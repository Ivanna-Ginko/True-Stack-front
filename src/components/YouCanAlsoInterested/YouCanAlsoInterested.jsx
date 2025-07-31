import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard'
import { fetchArticleById, fetchArticles } from '../../services/api';
import toast from 'react-hot-toast';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './YouCanAlsoInterested.module.css'
import { Loader } from '../Loader/Loader';

const YouCanAlsoInterested = ({ id, isSaved=false, config}) => {
    const [articlesList, setArticlesList] = useState([]);
    const [articles, setArticles] = useState([]);
    const [saved, setSaved] = useState(isSaved);
    const handleToggle = ()=>{
        setSaved(!saved);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState (false)
    useEffect(()=>{
        const getArticles = async () => {
            try{
                setIsLoading(true);
                const articles = await fetchArticles(config);
                setArticlesList(articles.data.data.data);
                const articleById = await fetchArticleById(id);
                setArticles(articleById.data.data)
            
            }catch(error){
                setIsError(true);
                toast.error('Please, try again'+` ${error.message}`)
            }finally{
                setIsLoading(false);
            }
        }
        getArticles(); 
    }, [config, id]);
    // const isSavedBtn = isAuthor && user.savedArticles?.includes(article.id);
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}.${month}.${year}`;
    };
    const originalDate = articles.date;
    return (
        <div>
            {isError && <p className={s.error}>Something went wrong. Please try again later.</p>}
            <div className={s.body}>
                <div className={s.topBody}>
                    <p><span className={s.span}>Author:</span> {isLoading ? <Loader/> : <span className={s.spanAuthor}>{articles.author}</span>}</p>
                    <p><span className={s.span}>Publication date:</span> {isLoading ? <Loader /> : articles.date ? formatDate(originalDate) : ''}</p>
                    <h3>You may also interested</h3>
                </div>
                <ul className={s.list}>
                    { isLoading ? <Loader /> : articlesList.map(article => {
                        return(<BlogCard key={article._id} title={article.title} author={article.author} linkId={article._id}/>)
                    })
                    }
                </ul>
            </div>
            
            <ButtonAddToBookmarks articleId={id} onClick={handleToggle}/>
        </div>
    )
}

export default YouCanAlsoInterested
