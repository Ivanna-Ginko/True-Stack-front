import { NavLink } from "react-router-dom";
import React from "react";
import s from './Header.module.css';

const GuestNav = () => {
    return (
        <nav className={s.nav}>
            <NavLink to="/" className={s.navLink}>Home</NavLink>
            <NavLink to="/articles" className={s.navLink}>Articles</NavLink>
            <NavLink to="/creators" className={s.navLink}>Creators</NavLink>
            <NavLink to="/login" className={s.navLink}>Login</NavLink>
        </nav>
    );
};
export default GuestNav;
