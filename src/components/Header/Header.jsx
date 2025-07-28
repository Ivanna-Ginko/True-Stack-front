import React, { useState } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon-header/harmoniq-header.svg';
import UserNav from './UserNav';
import GuestNav from './GuestNav';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import burgerIcon from '../../assets/icons/menu.svg';

const Header = () => {
  // const isAuthenticated = useSelector(state => state.user?.isLoggedIn);
  const isAuthenticated = true;
  const userName = {
    name: 'TestUser',
    avatarUrl: 'https://i.pravatar.cc/40',
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  return (
    <header className={s.header}>
      <Container>
        <div className={s.container}>
          <Link to="/" className={s.logoLink}>
            <img src={logo} alt="Harmoniq logo" className={s.logo} />
          </Link>
          <div className={s.rightSide}>
            <nav className={`${s.nav} ${isMenuOpen ? s.navOpen : ''}`}>
              {isAuthenticated ? <UserNav user={userName} /> : <GuestNav />}
            </nav>
            {isAuthenticated && (
              <Link to="/create-article" className={`${s.createBtn} ${s.tabletOnly}`}>
                Create an article
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/register" className={s.joinBtn}>
                Join now
              </Link>
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