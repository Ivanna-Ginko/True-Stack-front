import React from "react";
import s from './Header.module.css';
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import divider from '../../assets/icons/divider.svg';
import logoutIcon from '../../assets/icons/exit.svg';

const UserNav = () => {
    const user = useSelector(state => state.auth.user);
    const handleLogout = () => {
        console.log('Logout clicked');
    }
    const navLink = ({ isActive }) =>
        isActive ? s.activeLink : s.navLink;
    return (
        <nav className={s.nav}>
            <NavLink to="/" className={navLink}>Home</NavLink>
            <NavLink to="/articles" className={navLink}>Articles</NavLink>
            <NavLink to="/creators" className={navLink}>Creators</NavLink>
            <NavLink to="/profile" className={navLink}>My Profile</NavLink>
            <Link to="/create-article" className={`${s.createBtn} ${s.desktopOnly}`}>
              Create an article
            </Link>
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