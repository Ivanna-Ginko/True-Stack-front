import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ArticleTextArea from './ArticleTextArea';
import styles from './AddArticleForm.module.css';
import cameraImg from '../../assets/images/normal/CreateArticlePage/camera-article.png';
import { toast } from 'react-toastify';
import { createArticle, updateArticle } from '../../services/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

const initialValues = {
  title: '',
  article: '',
  img: null,
};

export default function ArticleForm({ editData, isEditing }) {
  const fileRef = useRef();
  const author = useSelector(selectUser)
  const navigate = useNavigate();
  const [isTablet, setIsTablet] = useState(false);

  // Check if screen size is tablet (768px to 1440px)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Function to calculate empty div height based on textarea content
  const calculateEmptyDivHeight = (textLength) => {
    if (textLength === 0) return 0; // Return to initial value when empty
    if (textLength < 500) return 30;
    if (textLength < 1000) return 100;
    if (textLength < 1500) return 200;
    if (textLength < 2000) return 400;
    if (textLength < 2500) return 600;
    if (textLength < 3000) return 900;
    if (textLength < 3500) return 1000;
    return 1050; // For 3500+ characters
  };


  // Create validation schema based on edit mode
  const getValidationSchema = () => {
    return Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(48, 'Title is too long (max 48)')
        .required('Title is required'),
      article: Yup.string()
        .min(100, 'Text must be at least 100 characters')
        .max(4000, 'Text is too long (max 4000)')
        .required('Text is required'),
      img: isEditing
        ? Yup.mixed()
          .nullable()
          .test(
            'fileSize',
            'Image must be less than 1Mb',
            value => !value || (value && value.size <= 1024 * 1024)
          )
        : Yup.mixed()
          .required('Image is required')
          .test(
            'fileSize',
            'Image must be less than 1Mb',
            value => !value || (value && value.size <= 1024 * 1024)
          ),
    });
  };

  // Set initial values for editing mode
  const getInitialValues = () => {
    if (isEditing && editData) {
      const values = {
        title: editData.title || '',
        article: editData.text || '',
        img: null,
      };
      return values;
    }
    return initialValues;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('article', values.article);
      if (values.img) {
        formData.append('img', values.img);
      }
      formData.append('author', author.name);
      formData.append('date', new Date().toISOString().split('T')[0]);

      let response;
      if (isEditing && editData) {
        // Update existing article
        const articleId = editData.articleId; // Get article ID from state
        response = await updateArticle(articleId, formData);
        toast.success('Article successfully updated!');
      } else {
        // Create new article
        response = await createArticle(formData);
        toast.success('Article successfully published!');
      }

      resetForm();
      if (response._id) {
        navigate(`/articles/${response._id}`);
      } else {
        navigate('/articles');
      }
    } catch (error) {
      console.log(error);
      toast.error(isEditing ? 'Failed to update article' : 'Failed to create article');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ setFieldValue, isSubmitting, values }) => {
        // Calculate empty div height based on current text length (only for tablet)
        const currentEmptyDivHeight = isTablet ? calculateEmptyDivHeight(values.article?.length || 0) : 0;

        return (
          <Form className={styles.form}>

            <div className={styles.imageBox}>
              <ErrorMessage name="img" component="div" className={styles.errorImg} />

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className={styles.imageInput}
                onChange={e => {
                  setFieldValue('img', e.target.files[0]);
                }}
              />
              {values.img ? (
                <img
                  src={URL.createObjectURL(values.img)}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              ) : editData?.photo ? (
                <img
                  src={editData.photo}
                  alt="Current article image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              ) : (
                <img src={cameraImg} alt="Camera icon" />
              )}
            </div>

            <div className={styles.left}>
              <label className={styles.label}>
                Title
                <Field
                  className={styles.input}
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  maxLength={48}
                // autoFocus
                />
                <ErrorMessage name="title" component="div" className={styles.error} />
              </label>
              <div className={styles.rightBox}>
                <div className={styles.right}>
                  {/* Використання кастомного textarea */}
                  <ArticleTextArea
                    className={styles.textarea}
                    name="article"
                    placeholder="Enter a text"
                  />

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Loader small={true} inline={true} />
                        <span >{isEditing ? 'Updating...' : 'Publishing...'}</span>
                      </div>
                    ) : (
                      <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
                    )}
                  </button>
                </div>
              </div>
              <div
                className={styles.emptyDiv}
                style={{ height: `${currentEmptyDivHeight}px` }}
              ></div>
            </div>



          </Form>
        );
      }}
    </Formik>
  );
}