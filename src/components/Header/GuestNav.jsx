import { NavLink } from "react-router-dom";
import React from "react";
import s from './Header.module.css';

const GuestNav = () => {
    const navLink = ({ isActive }) =>
        isActive ? s.activeLink : s.navLink;
    return (
        <nav className={s.nav}>
            <NavLink to="/"
                className={navLink}
            >
                Home
            </NavLink>
            <NavLink to="/articles"
                className={navLink}
            >
                Articles
            </NavLink>
            <NavLink to="/authors"
                className={navLink}
            >
                Creators
            </NavLink>
            <NavLink to="/login"
                className={navLink}
            >
                Login
            </NavLink>
        </nav>
    );
};
export default GuestNav;
