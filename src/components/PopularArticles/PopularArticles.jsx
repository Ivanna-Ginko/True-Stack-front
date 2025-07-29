import React, { useEffect, useState } from 'react'
import AppLink from '../AppLink/AppLink'
import s from './PopularArticles.module.css'
import Container from '../container/Container'
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchPopularArticles } from '../../services/api';

const PopularArticles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const getPopularArticles = async () =>{
            try {
                const response = await fetchPopularArticles();
                console.log(response);
                const popular = response.data.data.data?.slice(0, 3) || [];
                setArticles(popular);
            } catch (err) {
                console.log('❌ Помилка при завантаженні популярних статей:', err.message);
            }
        };
        getPopularArticles();
    },[]);
    return (
        <>
            <Container>
                <div className={s.innerContainer}>
                    <div className= {s.titleContainer}>
                        <h2 className={s.title}>Popular Articles</h2>
                        <div className={s.linkContainer}>
                            <AppLink variant='link' size='lg' to='/articles'> 
                                Go to all Articles
                                <svg width={14.25} height={14.25}>
                                    <use href='/src/assets/icons/arrow.svg#icon-arrow'></use>
                                </svg>
                            </AppLink>
                        </div>
                    </div>
                    <ArticlesList list={articles}/>
                </div>
            </Container>
        </>
    )
}

export default PopularArticles
