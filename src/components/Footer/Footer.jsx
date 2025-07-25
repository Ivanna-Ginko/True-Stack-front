import React from 'react';
import s from './Footer.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons-footer/harmoniq.svg'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.wrapper}>
        <Link to="/">
          <img src={logo} alt="Harmoniq logo" className={s.logo} />
        </Link>
        <p className={s.rights}>&copy; 2025 Harmoniq. All rights reserved.</p>
        <nav className={s.nav}>
          <Link to="/articles">Articles</Link>
          <Link to="/account">Account</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;