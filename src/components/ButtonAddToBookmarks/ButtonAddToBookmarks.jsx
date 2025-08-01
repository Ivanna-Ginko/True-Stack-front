import React, { useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify'; 
import ModalNotification from '../ModalErrorSave/ModalErrorSave'; 
import { addArticleToBookmarks, deleteArticleFromBookmarks } from '../../services/api'; 
import s from './ButtonAddToBookmarks.module.css';

const ButtonAddToBookmarks = ({ isAuthenticated, articleId, variant = 'default', styleVariant = 'primary', isWideцепропс = false, }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(variant); 

  const toggleBookmark = async () => {
    try {
      setLoading(true);
      await (bookmarkStatus === 'saved'
        ? deleteArticleFromBookmarks(articleId)
        : addArticleToBookmarks(articleId));

      setBookmarkStatus(bookmarkStatus === 'saved' ? 'default' : 'saved');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update bookmark');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      toggleBookmark();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoading(false); 
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={clsx(
          s.button,
          s[styleVariant], 
          bookmarkStatus === 'saved' && s[`${styleVariant}Saved`], 
          isWideцепропс && s.buttonWideцепропс
        )}
        disabled={loading}
        style={{
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? (
          <div className={s.loader}>Loading...</div> 
        ) : (
            <>
    <svg
      width={styleVariant === 'secondary' ? '20' : '24'}
      height={styleVariant === 'secondary' ? '20' : '24'}
      viewBox="0 0 26 32"
    >
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit="4"
        strokeWidth="1.8824"
        fill="none"
        stroke={bookmarkStatus === 'saved' ? '#000000' : '#649179'}
        d="M13.171 0.941c2.379 0 4.562 0.228 6.292 0.491 2.191 0.333 3.908 1.834 4.397 3.932 0.59 2.532 1.169 6.385 1.070 11.559-0.11 5.709-0.943 9.829-1.746 12.516-0.217 0.727-0.720 1.101-1.289 1.197-0.594 0.1-1.328-0.098-1.925-0.691-1.086-1.081-2.329-2.248-3.476-3.151-0.572-0.45-1.142-0.852-1.671-1.145-0.499-0.277-1.083-0.528-1.653-0.528-0.56 0-1.165 0.247-1.693 0.518-0.563 0.289-1.186 0.686-1.824 1.136-1.277 0.902-2.692 2.070-3.938 3.153-0.658 0.571-1.432 0.706-2.042 0.54-0.589-0.16-1.086-0.613-1.239-1.401-0.525-2.707-1.024-6.705-1.024-12.127 0-5.409 0.557-9.224 1.112-11.68 0.46-2.035 2.12-3.485 4.255-3.814 1.746-0.27 3.967-0.505 6.392-0.505z"
         />
    </svg>
              {/* {isWideцепропс && <span>Save</span>} */}
              {isWideцепропс && <span>{bookmarkStatus === 'saved' ? 'Saved' : 'Save'}</span>}

  </>
          // <svg
          //   width={styleVariant === 'secondary' ? '20' : '24'} 
          //   height={styleVariant === 'secondary' ? '20' : '24'}
          //   viewBox="0 0 26 32"
          // >
          //   <path
          //     strokeLinejoin="round"
          //     strokeLinecap="round"
          //     strokeMiterlimit="4"
          //     strokeWidth="1.8824"
          //     fill="none"
          //     stroke={
          //       bookmarkStatus === 'saved'
          //         ? (styleVariant === 'secondary' ? '#FF0000' : '#FFFFFF')
          //         : (styleVariant === 'secondary' ? '#000000' : '#649179')
          //     }
          //     d="M13.171 0.941c2.379 0 4.562 0.228 6.292 0.491 2.191 0.333 3.908 1.834 4.397 3.932 0.59 2.532 1.169 6.385 1.070 11.559-0.11 5.709-0.943 9.829-1.746 12.516-0.217 0.727-0.720 1.101-1.289 1.197-0.594 0.1-1.328-0.098-1.925-0.691-1.086-1.081-2.329-2.248-3.476-3.151-0.572-0.45-1.142-0.852-1.671-1.145-0.499-0.277-1.083-0.528-1.653-0.528-0.56 0-1.165 0.247-1.693 0.518-0.563 0.289-1.186 0.686-1.824 1.136-1.277 0.902-2.692 2.070-3.938 3.153-0.658 0.571-1.432 0.706-2.042 0.54-0.589-0.16-1.086-0.613-1.239-1.401-0.525-2.707-1.024-6.705-1.024-12.127 0-5.409 0.557-9.224 1.112-11.68 0.46-2.035 2.12-3.485 4.255-3.814 1.746-0.27 3.967-0.505 6.392-0.505z"
          //   />
          // </svg>
        )}
      </button>

      <ModalNotification
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Error while saving"
        text="To save this article, you need to authorize first"
        ErrorSave={true}
      />
    </>
  );
};

export default ButtonAddToBookmarks;