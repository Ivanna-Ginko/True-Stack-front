import React, { useState } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon-header/harmoniq-header.svg';
import UserNav from './UserNav';
import GuestNav from './GuestNav';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import burgerIcon from '../../assets/icons/menu.svg';
import AppLink from '../AppLink/AppLink';

const Header = () => {
  const user = useSelector(state => state.user.user);
  const isAuthenticated = Boolean(user?.name);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  return (
    <header className={s.header}>
      <Container>
        <div className={s.container}>
          <Link to="/" className={s.logoLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={logo} alt="Harmoniq logo" className={s.logo} />
          </Link>
          <div className={s.rightSide}>
            <nav className={`${s.nav} ${isMenuOpen ? s.navOpen : ''}`}>
              {isAuthenticated ? <UserNav /> : <GuestNav />}
            </nav>
            {isAuthenticated && (
              <div className={`${s.createBtn} ${s.tabletOnly}`}>
                <AppLink variant="fill" size="lg" to={'/create'} >
                  Create an article
                </AppLink>
              </div>
            )}
            {!isAuthenticated && (
              <div className={s.joinBtn}>
                <AppLink variant="fill" size="lg" to="/register">
                  Join now
                  </AppLink>
              </div>
            )}
            <button className={s.burgerBtn} onClick={toggleMenu}>
              <img src={burgerIcon} alt="Menu" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};


export default Header;