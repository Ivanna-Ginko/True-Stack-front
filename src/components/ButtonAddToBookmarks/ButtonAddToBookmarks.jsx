
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import ModalNotification from '../ModalErrorSave/ModalErrorSave';
import { addArticleToBookmarks, deleteArticleFromBookmarks } from '../../services/api';
import { selectSavedArticles, selectIsLoggedIn } from '../../redux/selectors';
import { addBookmark, removeBookmark } from '../../redux/bookmarksSlice';
import s from './ButtonAddToBookmarks.module.css';

const ButtonAddToBookmarks = ({
  articleId,
  variant = 'default',
  styleVariant = 'primary',
  isWideStyle = false,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const savedArticles = useSelector(selectSavedArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(variant);

  // Оновлення bookmarkStatus на основі savedArticles
  useEffect(() => {
    if (!articleId) {
      console.warn('ButtonAddToBookmarks - useEffect - Invalid articleId:', articleId);
      setBookmarkStatus('default');
      return;
    }

    if (!Array.isArray(savedArticles)) {
      console.error('ButtonAddToBookmarks - useEffect - savedArticles is not an array:', savedArticles);
      setBookmarkStatus('default');
      return;
    }

    const isSaved = savedArticles.some(id => String(id) === String(articleId));
    console.log('ButtonAddToBookmarks - useEffect - articleId:', articleId, 'savedArticles:', savedArticles, 'isSaved:', isSaved);
    setBookmarkStatus(isSaved ? 'saved' : 'default');
  }, [articleId, savedArticles]);

  const toggleBookmark = async () => {
    if (!articleId) {
      toast.error('Invalid article ID');
      console.error('ButtonAddToBookmarks - toggleBookmark - Invalid articleId:', articleId);
      return;
    }

    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      if (bookmarkStatus === 'saved') {
        await deleteArticleFromBookmarks(String(articleId));
        dispatch(removeBookmark(String(articleId)));
        setBookmarkStatus('default');
        toast.success('Article removed from bookmarks');
      } else {
        await addArticleToBookmarks(String(articleId));
        dispatch(addBookmark(String(articleId)));
        setBookmarkStatus('saved');
        toast.success('Article added to bookmarks');
      }
      console.log('ButtonAddToBookmarks - toggleBookmark - After operation - savedArticles:', savedArticles, 'bookmarkStatus:', bookmarkStatus);
    } catch (error) {
      console.error('ButtonAddToBookmarks - toggleBookmark - Error:', error.response?.data || error.message);
      if (error.response?.status === 404) {
        dispatch(removeBookmark(String(articleId)));
        setBookmarkStatus('default');
        toast.error('Article not found, removed from bookmarks');
      } else if (error.response?.status === 401) {
        setIsModalOpen(true);
      } else if (error.response?.status === 409 && bookmarkStatus !== 'saved') {
        dispatch(addBookmark(String(articleId)));
        setBookmarkStatus('saved');
        toast.info('Article is already in bookmarks');
      } else {
        toast.error(error.response?.data?.message || 'Failed to update bookmark');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    toggleBookmark();
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={clsx(
          s.button,
          s[styleVariant],
          bookmarkStatus === 'saved' && s.saved,
          isWideStyle && s.buttonWideStyle,
          bookmarkStatus === 'saved' && isWideStyle && s.buttonWideStyleSaved
        )}
        disabled={loading || !articleId}
        style={{
          opacity: loading || !articleId ? 0.6 : 1,
          cursor: loading || !articleId ? 'not-allowed' : 'pointer',
        }}
        aria-label={bookmarkStatus === 'saved' ? 'Remove from bookmarks' : 'Add to bookmarks'}
      >
        {loading ? (
          <div className={s.loader}>Loading...</div>
        ) : (
          <>
            {isWideStyle && (
              <span className={s.text}>
                {bookmarkStatus === 'saved' ? 'Saved' : 'Save'}
              </span>
            )}
            <svg
              width={styleVariant === 'secondary' ? '20' : '24'}
              height={styleVariant === 'secondary' ? '20' : '24'}
              viewBox="0 0 26 32"
              aria-hidden="true"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeMiterlimit="4"
                strokeWidth="1.8824"
                fill="none"
                stroke={bookmarkStatus === 'saved' ? '#f7fffb' : '#374F42'}
                d="M13.171 0.941c2.379 0 4.562 0.228 6.292 0.491 2.191 0.333 3.908 1.834 4.397 3.932 0.59 2.532 1.169 6.385 1.070 11.559-0.11 5.709-0.943 9.829-1.746 12.516-0.217 0.727-0.720 1.101-1.289 1.197-0.594 0.1-1.328-0.098-1.925-0.691-1.086-1.081-2.329-2.248-3.476-3.151-0.572-0.45-1.142-0.852-1.671-1.145-0.499-0.277-1.083-0.528-1.653-0.528-0.56 0-1.165 0.247-1.693 0.518-0.563 0.289-1.186 0.686-1.824 1.136-1.277 0.902-2.692 2.070-3.938 3.153-0.658 0.571-1.432 0.706-2.042 0.54-0.589-0.16-1.086-0.613-1.239-1.401-0.525-2.707-1.024-6.705-1.024-12.127 0-5.409 0.557-9.224 1.112-11.68 0.46-2.035 2.12-3.485 4.255-3.814 1.746-0.27 3.967-0.505 6.392-0.505z"
              />
            </svg>
          </>
        )}
      </button>

      <ModalNotification
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Authorization Required"
        text="To save this article, you need to log in first"
        ErrorSave={true}
      />
    </>
  );
};

export default ButtonAddToBookmarks;