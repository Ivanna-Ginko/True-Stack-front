import React from 'react'
import AppLink from '../AppLink/AppLink'
import svg from '../../assets/icons/arrow.svg'
import s from './BlogCard.module.css'
const BlogCard = ({ title, author, linkId}) => {
    return (
        <li key={linkId} className={s.listStyle}>
            <div className={s.flexContainer}>
                <p className={s.paragraph}>{title}</p>
                <div className={s.linkContainer}>
                    <AppLink variant='link' size='md' to={`/articles/${linkId}`}>
                        <img src={svg} alt="arrow icon" />
                    </AppLink>
                </div>
            </div>
            <div className={s.authorStyle}><p>{author}</p></div>
        </li>
    )
}

export default BlogCard
