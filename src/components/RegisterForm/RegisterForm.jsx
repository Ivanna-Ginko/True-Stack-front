import { Form, Formik, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../redux/operations";
import css from "./RegisterForm.module.css";
// import { toast } from "react-toastify";

import hidePwd from "../../assets/icons/crossed-eye.svg";
import showPwd from "../../assets/icons/eye.svg";

const RegisterForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPwd: "",
  };

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

  const handleSubmit = async (values) => {
    navigate("/photo", { state: { formData: values } });
  };

  //////// for testing purposes, registration is realised on upload form. uncomment for testing
  /////
  // const handleSubmit = async (values, actions) => {
  //   try {
  //     const { name, email, password } = values;
  //     console.log("Waiting:", values);
  //     const result = await dispatch(
  //       registerUser({ name, email, password })
  //     ).unwrap();
  //     console.log("Registration:", result);
  //     navigate("/photo");
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     toast.error(error?.message || "Registration failed");
  //     actions.setSubmitting(false);
  //   }
  // };
  ////////

  // hide show pwd

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleRepeat = () => setShowRepeat((prev) => !prev);
  //

  return (
    <div className={css.container}>
      <h1 className={css.header}>Register</h1>
      <p className={css.text}>
        Join our community of mindfulness and wellbeing!
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={css.formContainer}>
            <label className={css.label} htmlFor="name">
              Enter your name
            </label>
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
            <ErrorMessage name="name" component="div" className={css.errMsg} />

            <label className={css.label} htmlFor="email">
              Enter your email address
            </label>

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

            <ErrorMessage name="email" component="div" className={css.errMsg} />

            <label className={css.label} htmlFor="password">
              Create a strong password
            </label>
            <Field name="password">
              {({ field, meta }) => (
                <div className={css.pwdField}>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="*********"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css["is-invalid"] : ""
                    }`}
                  />
                  <span className={css.iconWrap}>
                    <img
                      src={showPassword ? showPwd : hidePwd}
                      alt={showPassword ? "Hide password" : "Show password"}
                      onClick={togglePassword}
                      className={css.eyeIcon}
                    />
                  </span>
                </div>
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errMsg}
            />

            <label className={css.label} htmlFor="repeatPwd">
              Repeat your password
            </label>
            <Field name="repeatPwd">
              {({ field, meta }) => (
                <div className={css.pwdField}>
                  <input
                    {...field}
                    type={showRepeat ? "text" : "password"}
                    id="repeatPwd"
                    placeholder="*********"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css["is-invalid"] : ""
                    }`}
                  />
                  <span className={css.iconWrap}>
                    <img
                      src={showRepeat ? showPwd : hidePwd}
                      alt={showPassword ? "Hide password" : "Show password"}
                      onClick={toggleRepeat}
                      className={css.eyeIcon}
                    />
                  </span>
                </div>
              )}
            </Field>
            <ErrorMessage
              name="repeatPwd"
              component="div"
              className={css.errMsg}
            />

            {isSubmitting && (
              <div className={css.progressBar}>
                <div className={css.progressInner}></div>
              </div>
            )}

            <button
              className={`${css.btn} ${
                !isValid || isSubmitting ? css.disabledBtn : ""
              }`}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>

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
