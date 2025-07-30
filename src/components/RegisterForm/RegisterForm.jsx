import { Form, Formik, Field, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/operations";
import css from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      // Успішна реєстрація — редірект
      await dispatch(registerUser(values)).unwrap();
      <Navigate to="/photo" />;
    } catch (error) {
      console.log("registration:", error);
      actions.setSubmitting(false);
      // Обробка помилки від backend тут за потреби
    }
  };

  // const handleSubmit = (values, options) => {
  //   console.log(values);
  //   dispatch(registerUser(values));
  // };

  const RegisterSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(32, "Must be 32 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .max(64, "Email is too long")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .max(64, "Password is too long")
      .required("Required"),
    repeatPwd: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repeat your password"),
  });

  return (
    <div className={css.container}>
      <h1 className={css.header}>Register</h1>
      <p className={css.text}>
        Join our community of mindfulness and wellbeing!
      </p>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.formContainer}>
            <label className={css.labelName}>Enter your name</label>
            <Field name="name">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Max"
                  className={`${css.field} ${
                    meta.touched && meta.error ? css["is-invalid"] : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage className={css.errMsg} name="name" component="div" />

            <label className={css.label}>Enter your email address</label>
            <Field name="email">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="email@gmail.com"
                  className={`${css.field} ${
                    meta.touched && meta.error ? css["is-invalid"] : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage className={css.errMsg} name="email" component="div" />

            <label className={css.label}>Create a strong password</label>
            <Field name="password">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="*********"
                  className={`${css.field} ${
                    meta.touched && meta.error ? css["is-invalid"] : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage
              className={css.errMsg}
              name="password"
              component="div"
            />

            <label className={css.label}>Repeat your password</label>
            <Field name="repeatPwd">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="*********"
                  className={`${css.field} ${
                    meta.touched && meta.error ? css["is-invalid"] : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage
              className={css.errMsg}
              name="repeatPwd"
              component="div"
            />
            <button className={css.btn} type="submit">
              Create account
            </button>
          </Form>
        </Formik>
      </div>
      <div className={css.helpText}>
        <p>Already have an account?&nbsp;</p>
        <Link className={css.linkToLogin} to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
