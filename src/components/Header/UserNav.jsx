import React, { useState } from "react";
import s from './Header.module.css';
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import divider from '../../assets/icons/divider.svg';
import LogoutIcon from '../../assets/icons/exit.svg?react';
import AppLink from '../AppLink/AppLink';
import { logoutUser } from '../../redux/operations';
import { toast } from "react-toastify";
import ModalNotification from "../ModalErrorSave/ModalErrorSave";

const UserNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user?.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            toast.error(`Logout failed. ${error.message}`);
        } finally {
            closeModal();
            navigate("/login");
        }
    };
    const navLink = ({ isActive }) =>
        (isActive ? s.activeLink : s.navLink);
    return (
        <>
            <nav className={s.nav}>
                <NavLink to="/" className={navLink}>Home</NavLink>
                <NavLink to="/articles" className={navLink}>Articles</NavLink>
                <NavLink to="/authors" className={navLink}>Creators</NavLink>
                <NavLink to="/authors/:id" className={navLink}>My Profile</NavLink>
                <div  className={`${s.createBtn} ${s.desktopOnly}`}>
                    <AppLink variant="fill" size="lg"  to={'/create'} > 
                        Create an article
                    </AppLink>
                </div>
                {user && (
                    <div className={s.userBlock}>
                        <AppLink variant='link' to={`/authors/${user.id}`}>
                            {user.avatarUrl && (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className={s.avatar}
                                />
                            )}
                            <span className={s.userName}>{user?.name}</span>
                        </AppLink>
                        <img src={divider} alt="divider" className={s.divider} />
                        <button className={s.logoBtn} onClick={openModal}>
                            <LogoutIcon className={s.logoutImg} width={24} height={28} />
                        </button>
                    </div>
                )}
            </nav>
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
        </>
    );
};
export default UserNav;