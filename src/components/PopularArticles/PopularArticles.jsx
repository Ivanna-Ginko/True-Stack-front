import React, { useEffect, useState } from 'react'
import AppLink from '../AppLink/AppLink'
import axios from 'axios';
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import s from './PopularArticles.module.css'
import Container from '../container/Container'

const PopularArticles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const fetchPopularArticles = async () =>{
            try{
                const res = await axios.get();
                setArticles(res.data);
            }
            catch(error){
                console.error('❌ Помилка при завантаженні статей:', error.message);
            }
        };
        fetchPopularArticles();
    },[]);
    return (
        <>
            <Container>
                <div className= {s.titleContainer}>
                    <h2 className={s.title}>Popular Articles</h2>
                    <AppLink variant='link' size='lg' to='/articles'> 
                        Go to all Articles
                        <svg width={14.25} height={14.25}>
                            <use href='/src/assets/icons/arrow.svg#icon-arrow'></use>
                        </svg>
                    </AppLink>
                </div>
                <ul>
                    {articles.map(article => (
                        <ArticlesItem ket={article.id} id={article.id} image={article.image} author={article.author} title={article.title} description={article.description}/>
                    ))}
                </ul>
            </Container>
        </>
    )
}

export default PopularArticles
