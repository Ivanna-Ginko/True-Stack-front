import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { articleFormValidation } from './articleFormValidation';
import ArticleTextArea from './ArticleTextArea';
import styles from './AddArticleForm.module.css';
import cameraImg from '../../assets/images/normal/CreateArticlePage/camera-article.png';
import { toast } from 'react-toastify';
import { createArticle } from '../../services/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  title: '',
  article: '',
  img: null,
};

export default function ArticleForm() {
  const fileRef = useRef();
  const author = useSelector(selectUser)
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('article', values.article);
      formData.append('img', values.img);
      formData.append('author', author.name);
      formData.append('date', new Date().toISOString().split('T')[0]); // Add date field
      const response = await createArticle(formData);
      toast.success('Article successfully published!');
      resetForm();
      if (response._id) {
        navigate(`/articles/${response._id}`);
      } else {
        navigate('/articles');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={articleFormValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form className={styles.form}>
          <div className={styles.imageBox}>
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
            ) : (
              <img src={cameraImg} alt="Camera icon" />
            )}
            <ErrorMessage name="img" component="div" className={styles.errorImg} />
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
                  Publish Article
                </button>
              </div>
            </div>
          </div>



        </Form>
      )}
    </Formik>
  );
}