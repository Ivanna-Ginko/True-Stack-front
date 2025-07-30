import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./ModalErrorsave.module.css";
import { NavLink } from "react-router-dom";

const ModalNotification = ({
  isOpen,
  onClose,
  title,
  text,
  onConfirm,
  logOut,
  ErrorSave,
}) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.reactModalContent}
      overlayClassName={css.reactModalOverlay}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <button onClick={onClose} className={css.buttonExit}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25 5.25L12 12M12 12L5.25 18.75M12 12L18.75 18.75M12 12L18.75 5.25"
              stroke="#070721"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className={css.modalErrorText}>
          <h1 className={css.ErrorFont}>{title}</h1>
        </div>
        <div className={css.saveArticle}>
          <p className={css.SaveArticleFont}>{text}</p>
        </div>
        {logOut && (
          <div className={css.navButton}>
            <button
              className={css.modalButton}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Log out
            </button>
            <button
              className={css.modalButton}
              onClick={() => {
                onClose();
              }}
            >
              Cansel
            </button>
          </div>
        )}
        {ErrorSave && (
          <div className={css.navButton}>
            <NavLink to="/login">
              <button
                className={css.modalButton}
                onClick={() => {
                  onClose();
                }}
              >
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button
                className={css.modalButton}
                onClick={() => {
                  onClose();
                }}
              >
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalNotification;
