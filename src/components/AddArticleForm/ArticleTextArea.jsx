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
      {...props}
    />
    <ErrorMessage name={name} component="div" className={styles.error} />
  </label>
);

export default ArticleTextArea;