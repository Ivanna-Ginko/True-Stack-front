import React from "react";
import s from './MobileMenu.module.css';
import { useSelector } from "react-redux";
import Close from '../../assets/icons/close.svg?react';
import logo from '../../assets/icon-header/harmoniq-header.svg';
import { NavLink } from "react-router-dom";
import AppLink from "../AppLink/AppLink";
import LogoutIcon from '../../assets/icons/exit.svg?react';
import divider from '../../assets/icons/divider.svg';

const MobileMenu = ({ closeMenu }) => {
    const user = useSelector(state => state.user.user);
    const isAuthenticated = Boolean(user?.name);
    const handleLinkClick = () => closeMenu();
    const navLinkClass = ({ isActive }) =>
        (isActive ? `${s.navLink} ${s.active}` : s.navLink);
    return (
        <div className={s.menuBackdrop}>
            <div className={s.menu}>
                <div className={s.topRow}>
                    <img src={logo} alt='Harmoniq logo' className={s.logo} />
                    <div className={s.menuActions}>
                        <div className={s.tabletButtons}>
                            {isAuthenticated ? (
                                <div className={s.createBtn}>
                                    <AppLink variant="fill" size="lg" to={'/create'} onClick={handleLinkClick} >
                                        Create an article
                                    </AppLink>
                                    
                                </div>
                            ) : (
                                <div className={s.joinBtn}>
                                    <AppLink variant="fill" size="lg" to="/register" onClick={handleLinkClick}>
                                        Join now
                                    </AppLink>
                                </div>
                            )}
                        </div>
                        <button className={s.closeBtn} onClick={closeMenu}>
                            <Close className={s.close} width={32} height={32} />
                        </button>
                    </div>
                </div>
                <nav className={s.nav}>
                    <NavLink to='/' className={navLinkClass} onClick={handleLinkClick}>
                        Home
                    </NavLink>
                    <NavLink to='/articles' className={navLinkClass} onClick={handleLinkClick}>
                        Articles
                    </NavLink>
                    <NavLink to='/authors' className={navLinkClass} onClick={handleLinkClick}>
                        Creators
                    </NavLink>
                    {isAuthenticated ? (
                        <NavLink to='/profile' className={navLinkClass} onClick={handleLinkClick}>
                            My Profile
                        </NavLink>
                    ) : (
                        <NavLink to='/login' className={navLinkClass} onClick={handleLinkClick}>
                            Login
                        </NavLink>
                    )}
                
                    <div className={s.userActions}>
                        {isAuthenticated && (
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
                                <img src={divider} alt="divider" className={s.divider} />
                                <button className={s.logoutBtn} onClick={handleLinkClick}>
                                    <LogoutIcon className={s.logoutIcon} width={24} height={28} />
                                </button>
                            </div>
                        )}
                        <div className={s.mobileButtons}>
                            {isAuthenticated ? (
                                <div className={s.createBtn}>
                                    <AppLink variant="fill" size="lg" to={'/create'} onClick={handleLinkClick} >
                                        Create an article
                                    </AppLink>
                                </div>
                            ) : (
                                <div className={s.joinBtn}>
                                    <AppLink variant="fill" size="lg" to="/register" onClick={handleLinkClick}>
                                        Join now
                                    </AppLink>
                                    </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;