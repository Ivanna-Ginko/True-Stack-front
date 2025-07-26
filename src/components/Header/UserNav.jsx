import React from "react";
import s from './Header.module.css';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import divider from '../../assets/icons/divider.svg';
import logoutIcon from '../../assets/icons/exit.svg';

const UserNav = () => {
    const user = useSelector(state => state.auth.user);
    const handleLogout = () => {
        console.log('Logout clicked');
    }
    const navLinkClass = ({ isActive }) =>
        isActive ? s.activeLink : s.navLink;
    return (
        <nav className={s.nav}>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/articles" className={navLinkClass}>Articles</NavLink>
            <NavLink to="/creators" className={navLinkClass}>Creators</NavLink>
            <NavLink to="/profile" className={navLinkClass}>My Profile</NavLink>
            <NavLink to="/create-article" className={`${s.navLinkClass} ${s.createBtn}`}>
                Create an article
            </NavLink>
            {user && (
                <div className={s.userBlock}>
                    {user.avatarUrl && (
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className={s.avatar}
                        />
                    )}
                    <span className={s.userName}>{user?.name}</span>
                    <img src={divider} alt="divider" className={s.divider} />
                    <button className={s.logoBtn} onClick={handleLogout}>
                        <img src={logoutIcon} alt="Logout" className={s.logoutImg} />
                    </button>
                </div>
            )}
        </nav>
    );
};
export default UserNav;