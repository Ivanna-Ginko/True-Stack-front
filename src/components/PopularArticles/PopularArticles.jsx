import AppLink from '../AppLink/AppLink'
import s from './PopularArticles.module.css'
import Container from '../container/Container'
import ArticlesList from '../ArticlesList/ArticlesList';
import svg from '../../assets/icons/arrow.svg'

const PopularArticles = () => {

    const config = {
        params: {
            'sortBy': 'rate',
            'perPage': 4
        }
    }
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
                    <ArticlesList hideFourthOnDesktop config={config}/>
                </div>
            </Container>
        </>
    )
}

export default PopularArticles