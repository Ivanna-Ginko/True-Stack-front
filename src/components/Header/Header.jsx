import React, { useState } from 'react';
import s from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon-header/harmoniq-header.svg';
import UserNav from './UserNav';
import GuestNav from './GuestNav';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../container/Container';
import BurgerIcon from '../../assets/icons/menu.svg?react';
import AppLink from '../AppLink/AppLink';
import MobileMenu from '../MobileMenu/MobileMenu';
import { toast } from 'react-toastify';
import { logoutUser } from '../../redux/operations';
import ModalNotification from '../ModalErrorSave/ModalErrorSave';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = Boolean(user?.name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => { setIsMenuOpen(prev => !prev); };
  const closeMenu = () => { setIsMenuOpen(false); };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(`Logout failed. ${error.message}`);
    } finally {
      closeModal();
    }
  };
  
  return (
    <header className={s.header}>
      <Container>
        <div className={s.container}>
          <Link to="/" className={s.logoLink} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Harmoniq logo" className={s.logo} />
          </Link>
          <div className={s.rightSide}>
            <nav className={`${s.nav} ${isMenuOpen ? s.navOpen : ''}`}>
              {isAuthenticated ? (<UserNav user={user} openModal={openModal} />) : (<GuestNav />)}
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
              <BurgerIcon className={s.burgerIcon} width={32} height={32} />
            </button>
          </div>
        </div>
      </Container>
      {isMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          closeMenu={closeMenu}
          openModal={openModal}
        />
      )}
      {isModalOpen && (
        <ModalNotification
          isOpen={isModalOpen}
          onClose={closeModal}
          title='Are you sure?'
          text='We will miss you!'
          onConfirm={handleLogout}
          logOut={true}
        />
      )}
    </header>
  );
};


export default Header;