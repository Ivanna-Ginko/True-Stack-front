import AppLink from '../AppLink/AppLink'
import s from './PopularArticles.module.css'
import Container from '../container/Container'
import ArticlesList from '../ArticlesList/ArticlesList';
import svg from '../../assets/icons/arrow.svg'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import { fetchArticles } from '../../services/api';

const PopularArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getArticle = async () => {try{
            setIsLoading(true);
            const config = {
                params: {
                    'sortBy': 'rate',
                    'perPage': 4
                }
            }
            const response = await fetchArticles(config);
            setArticles(response.data.data);
        }catch(error){
        toast.warning('No articles found', error.massage, 
            {
                style: {
                backgroundColor: 'rgba(209, 224, 216, 1)',
                color: '#333',
                },
            });
        }finally{
            setIsLoading(false);
        }}
    getArticle();
    }, []);
    const articleArr = articles?.data || [];
    return (
        <>
            <Container>
                <div id="popularArticles" className={s.innerContainer}>
                    <div className={s.titleContainer}>
                        <h2 className={s.title}>Popular Articles</h2>
                        <div className={s.linkContainer}>
                            <AppLink variant='link' size='lg' to='/articles'>
                                Go to all Articles
                                <img src={svg} alt="arrow icon" />
                            </AppLink>
                        </div>
                    </div>
                    {isLoading ? <Loader small className={s.loader}/> : (<ArticlesList articles= {articleArr} hideFourthOnDesktop/>)}
                </div>
            </Container>
        </>
    )
}

export default PopularArticles