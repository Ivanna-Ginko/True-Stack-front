import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/icons/EditArticleButton.svg';
import styles from './EditArticleButton.module.css';

const EditArticleButton = ({ articleId }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = async () => {
    setLoading(true);
    setIsEdit(true);

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const articleData = await response.json();

      navigate(`/articles/${articleId}`, {
        state: {
          title: articleData.title,
          text: articleData.text,
          photo: articleData.photo,
        },
      });
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEditClick}
      className={`${styles.button} ${isEdit ? styles.edit : ''}`}
      disabled={loading}
      aria-label="Edit article"
    >
      <img
        src={EditIcon}
        alt="Edit Icon"
        className={`${styles.icon} ${isEdit ? styles.editIcon : ''}`}
      />
    </button>
  );
};

export default EditArticleButton;