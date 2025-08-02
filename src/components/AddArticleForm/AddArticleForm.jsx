import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { articleFormValidation } from './articleFormValidation';
import ArticleTextArea from './ArticleTextArea';
import styles from './AddArticleForm.module.css';
import cameraIcon from '../../assets/icons/camera.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  title: '',
  text: '',
  image: null,
};

export default function ArticleForm() {
  const fileRef = useRef();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success('Article successfully published!');
      resetForm();
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <ToastContainer />
      <h1 className={styles.heading}>Create an article</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={articleFormValidation}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className={styles.form}>
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
                name="text"
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

            <label className={styles.imageBox}>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className={styles.imageInput}
                onChange={e => {
                  setFieldValue('image', e.target.files[0]);
                }}
              />
              {values.image ? (
                <img
                  src={URL.createObjectURL(values.image)}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              ) : (
                <img src={cameraIcon} alt="camera icon" className={styles.cameraIcon} />
              )}
              <ErrorMessage name="image" component="div" className={styles.errorImg} />
            </label>
          </Form>
        )}
      </Formik>
    </div>
  );
}