import React from 'react';
import s from './Footer.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons-footer/harmoniq.svg'
import Container from '../container/Container';
import AppLink from '../AppLink/AppLink';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.wrapper}>
            <Link to="/">
              <img src={logo} alt="Harmoniq logo" className={s.logo} />
            </Link>
            <p className={s.rights}>&copy; 2025 Harmoniq. All rights reserved.</p>
            <nav className={s.nav}>
              <AppLink to="/articles" variant="link" size="md" className={s.footerLink}>
              Articles
              </AppLink>
              <AppLink to="/account" variant="link" size="md" className={s.footerLink}>
              Account
              </AppLink>
            </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;