import React, { useState } from 'react';
import axios from 'axios';
import styles from './EditArticleButton.module.css';

const EditArticleButton = ({ articleId, newData, onSuccess }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePatch = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.patch(`https://truestack.onrender.com/articles/${articleId}`, newData);
      setIsSaved(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Помилка оновлення статті:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePatch}
      className={`${styles.button} ${isSaved ? styles.saved : ''}`}
      disabled={loading}
    >
      <svg
        className={`${styles.icon} ${isSaved ? styles.savedIcon : ''}`}
        viewBox="0 0 26 32"
        fill="none"
      >
        <path d="M9.423 30.25h-7.673v-7.688l15.894-15.925M9.423 30.25h20.827M9.423 30.25l15.894-15.925M17.644 6.637l3.288-3.295c2.119-2.123 5.554-2.123 7.673 0s2.119 5.565 0 7.688l-3.288 3.295M17.644 6.637l7.673 7.688"
         stroke="currentColor"/>
      </svg>
    </button>
  );
};

export default EditArticleButton;
