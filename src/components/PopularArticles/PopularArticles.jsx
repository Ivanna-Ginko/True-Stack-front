import React, { useEffect, useState } from 'react'
import AppLink from '../AppLink/AppLink'
import s from './PopularArticles.module.css'
import Container from '../container/Container'
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchPopularArticles } from '../../services/api';
import svg from '../../assets/icons/arrow.svg'

const PopularArticles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const getPopularArticles = async () =>{
            try {
                const response = await fetchPopularArticles();
                console.log(response);
                const popular = response.data.data.data?.slice(0, 4) || [];
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
                <div id="popularArticles"  className={s.innerContainer}>
                    <div className= {s.titleContainer}>
                        <h2 className={s.title}>Popular Articles</h2>
                        <div className={s.linkContainer}>
                            <AppLink variant='link' size='lg' to='/articles'> 
                                Go to all Articles
                                <img src={svg} alt="arrow icon"/>
                            </AppLink>
                        </div>
                    </div>
                    <ArticlesList list={articles} hideFourthOnDesktop/>
                </div>
            </Container>
        </>
    )
}

export default PopularArticles
