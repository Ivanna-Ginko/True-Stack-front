import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './AddArticleForm.module.css';

const ArticleTextArea = ({ name, placeholder, ...props }) => (
  <label className={styles.label}>
    <Field
      as="textarea"
      className={styles.textarea}
      name={name}
      placeholder={placeholder}
      maxLength={4000}
      onInput={(e) => {
        // Reset to initial height if empty, otherwise auto-adjust
        if (e.target.value.trim() === '') {
          e.target.style.height = '393px';
        } else {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }
      }}
      {...props}
    />
    <ErrorMessage name={name} component="div" className={styles.error} />
  </label>
);

export default ArticleTextArea;