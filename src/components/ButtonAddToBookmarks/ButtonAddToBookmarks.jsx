import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ButtonAddToBookmarks.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../redux/operations'; 
import { selectIsLoggedIn } from '../../redux/selectors'; 

const ButtonAddToBookmarks = ({ articleId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  
  useEffect(() => {
    
  }, [articleId]);

  const handleClick = async () => {
    if (loading) return;

    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      if (isSaved) {
        await dispatch(removeArticleFromBookmarks(articleId)).unwrap();
        toast.success('Article successfully deleted!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        await dispatch(addArticleToBookmarks(articleId)).unwrap();
        toast.success('Article successfully saved!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      setIsSaved(prev => !prev);
    } catch (error) {
      toast.error(`Помилка: ${error.message || 'Failed to save/delete article'}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      if (error.message?.includes('401')) {
        setIsModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        <button
  className={`${styles.button} ${isSaved ? styles.buttonSaved : ''}`}
  onClick={handleClick}
  disabled={loading}
  style={{
    opacity: loading ? 0.6 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
  }}
>
  <svg width="24" height="24" viewBox="0 0 26 32">
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit="4"
      strokeWidth="1.8824"
      fill="none"
      stroke={isSaved ? '#FFFFFF' : '#374F42'}
            d="M13.171 0.941c2.379 0 4.562 0.228 6.292 0.491 2.191 0.333 3.908 1.834 4.397 3.932 0.59 2.532 1.169 6.385 1.070 11.559-0.11 5.709-0.943 9.829-1.746 12.516-0.217 0.727-0.72 1.101-1.289 1.197-0.594 0.1-1.328-0.098-1.925-0.691-1.086-1.081-2.329-2.248-3.476-3.151-0.572-0.45-1.142-0.852-1.671-1.145-0.499-0.277-1.083-0.528-1.653-0.528-0.56 0-1.165 0.247-1.693 0.518-0.563 0.289-1.186 0.686-1.824 1.136-1.277 0.902-2.692 2.070-3.938 3.153-0.658 0.571-1.432 0.706-2.042 0.54-0.589-0.16-1.086-0.613-1.239-1.401-0.525-2.707-1.024-6.705-1.024-12.127 0-5.409 0.557-9.224 1.112-11.68 0.46-2.035 2.12-3.485 4.255-3.814 1.746-0.27 3.967-0.505 6.392-0.505z"
          />
        </svg>
      </button>

      {isModalOpen && <ModalErrorSave onClose={closeModal} />}
    </>
  );
};

export default ButtonAddToBookmarks;