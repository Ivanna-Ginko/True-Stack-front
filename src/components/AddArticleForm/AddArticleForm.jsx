import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { articleFormValidation } from './articleFormValidation';
import ArticleTextArea from './ArticleTextArea';
import styles from './AddArticleForm.module.css';
import cameraIcon from '../../assets/icons/camera.svg';
import { toast } from 'react-toastify';
import { createArticle } from '../../services/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';

const initialValues = {
  title: '',
  article: '',
  img: null,
};

export default function ArticleForm() {
  const fileRef = useRef();
  const author = useSelector(selectUser)
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values)
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('article', values.article);
      formData.append('img', values.img);
      formData.append('author', author.id);
      formData.append('date', new Date().toISOString().split('T')[0]); // Add date field
      await createArticle(formData);
      toast.success('Article successfully published!');
      resetForm();
    } catch (error) {
      console.error('Backend error:', error.response?.data);
      // Show backend validation errors
      if (error.response?.data?.data?.errors) {
        const errors = error.response.data.data.errors;
        errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.response?.data?.message || 'Server error. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={articleFormValidation}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors, touched }) => (
          <Form className={styles.form}>
            {/* Debug info */}
            {console.log('Form values:', values)}
            {console.log('Form errors:', errors)}
            {console.log('Form touched:', touched)}
            {console.log('Form isSubmitting:', isSubmitting)}

            <div className={styles.left}>
              <label className={styles.label}>
                Title
                <Field
                  className={styles.input}
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  maxLength={48}
                  autoFocus
                />
                <ErrorMessage name="title" component="div" className={styles.error} />
              </label>

              {/* Використання кастомного textarea */}
              <ArticleTextArea
                name="article"
                placeholder="Enter a text"
              />

              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
                onClick={() => {
                  console.log(values)
                }}
              >
                Publish Article
              </button>
            </div>

            <label className={styles.imageBox}>
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
                <img src={cameraIcon} alt="camera icon" className={styles.cameraIcon} />
              )}
              <ErrorMessage name="img" component="div" className={styles.errorImg} />
            </label>
          </Form>
        )}
      </Formik>
    </div>
  );
}