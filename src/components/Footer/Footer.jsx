import React from 'react';
import s from './Footer.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons-footer/harmoniq.svg'
import Container from '../container/Container';
import AppLink from '../AppLink/AppLink';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector(state => state.user?.user);
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.wrapper}>
            <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img src={logo} alt="Harmoniq logo" className={s.logo} />
            </Link>
            <p className={s.rights}>&copy; 2025 Harmoniq. All rights reserved.</p>
            <ul className={s.nav}>
              <li>
                <AppLink to="/articles" variant="link" size="md">
                Articles
                </AppLink>
              </li>
              <li>
                <AppLink to={`/authors/${user.id}`} variant="link" size="md">
                Account
                </AppLink>
              </li>
            </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;