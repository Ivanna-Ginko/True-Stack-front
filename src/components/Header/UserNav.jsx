import React from "react";
import s from './Header.module.css';
import { Link, NavLink } from "react-router-dom";
import divider from '../../assets/icons/divider.svg';
import LogoutIcon from '../../assets/icons/exit.svg?react';
import AppLink from '../AppLink/AppLink';

const UserNav = ({user,openModal}) => {
    
    const navLink = ({ isActive }) =>
        (isActive ? s.activeLink : s.navLink);
    return (
        <>
            <nav className={s.nav}>
                <NavLink to="/" className={navLink}>Home</NavLink>
                <NavLink to="/articles" className={navLink}>Articles</NavLink>
                <NavLink to="/authors" end className={navLink}>Creators</NavLink>
                <NavLink to={`/authors/${user.id}`} className={navLink}>My Profile</NavLink>
                <div  className={`${s.createBtn} ${s.desktopOnly}`}>
                    <AppLink variant="fill" size="lg"  to={'/create'} > 
                        Create an article
                    </AppLink>
                </div>
                {user && (
                    <div className={s.userBlock}>
                        <div className={s.userWrapper}>
                            <AppLink variant='link' to={`/authors/${user.id}`}>
                                {user.avatarUrl && (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className={s.avatar}
                                    />
                                )}
                                <span className={s.userName}>{user?.name}</span>
                            </AppLink>
                        </div>
                        <div className={s.logoutBlock}>
                            <img src={divider} alt="divider" className={s.divider} />
                            <button className={s.logoBtn} onClick={openModal}>
                                <LogoutIcon className={s.logoutImg} width={24} height={28} />
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
export default UserNav;