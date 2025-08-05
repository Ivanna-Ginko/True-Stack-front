import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/icons/EditArticleButton.svg';
import styles from './EditArticleButton.module.css';
import { fetchArticleById } from '../../services/api';
import { toast } from 'react-toastify';

const EditArticleButton = ({ articleId }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = async () => {
    setLoading(true);
    setIsEdit(true);

    try {
      const response = await fetchArticleById(articleId);
      const articleData = response.data;

      const navigationState = {
        title: articleData.data.title,
        text: articleData.data.article,
        photo: articleData.data.img,
        articleId: articleId,
      };

      navigate(`/create`, {
        state: navigationState,
      });
    } catch (error) {
      toast.error('Failed to fetch article');
      console.error('❌ EditArticleButton: Error fetching article:', error);
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