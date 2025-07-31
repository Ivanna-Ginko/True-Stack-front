import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard'
import { fetchArticles } from '../../services/api';
import toast from 'react-hot-toast';

const YouCanAlsoInterested = ({ id, author, publishDate, isSaved=false, config}) => {
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
                const article = await fetchArticles(config);
                setArticles(article.data.data);
            
            }catch(error){
                setIsError(true);
                toast.error('Please, try again'+` ${error.message}`)
            }finally{
                setIsLoading(false);
            }
        }
        getArticles(); 
    }, [config]);
    const articlesArr = articles.data
    return (
        <div>
            <p>Author: <span>{author}</span></p>
            <p>Publication date: {publishDate}</p>
            <h3>You may also interested</h3>
            <ul>
                { articlesArr.map(article => 
                    { return(<BlogCard key={article.id} title={article.title} author={article.author} linkId={article.id}/>)
                })
                }
            </ul>
            <ButtonAddToBookmarks articleId={id} onClick={handleToggle}/>
        </div>
    )
}

export default YouCanAlsoInterested
