import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../redux/operations";
import { selectIsLoading } from "../../redux/selectors";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";

import hidePwd from "../../assets/icons/crossed-eye.svg";
import showPwd from "../../assets/icons/eye.svg";

const LoginSchema = Yup.object({
  email: Yup.string().email("Wrong email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short")
    .max(64, "Password is too long")
    .required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const resultAction = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else if (loginUser.rejected.match(resultAction)) {
        const error = resultAction.payload;

        if (Array.isArray(error)) {
          error.forEach((err) => {
            setFieldError(err.field, err.message);
          });
        } else if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("Unauthorized error");
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  // hide show pwd
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(hidePwd);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(showPwd);
      setType("text");
    } else {
      setIcon(hidePwd);
      setType("password");
    }
  };

  //
  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={css.formContainer}>
            <label htmlFor="email" className={css.labelName}>
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
            <ErrorMessage className={css.errMsg} name="email" component="div" />

            <label htmlFor="password" className={css.label}>
              Enter a password
            </label>

            <Field name="password">
              {({ field, meta }) => (
                <div className={css.pwdField}>
                  <input
                    {...field}
                    type={type}
                    placeholder="*********"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css["is-invalid"] : ""
                    }`}
                  />
                  <span className={css.iconWrap}>
                    <img
                      src={icon}
                      alt="Toggle visibility"
                      onClick={handleToggle}
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

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`${css.btn} ${
                !isValid || isSubmitting || isLoading ? css.disabledBtn : ""
              }`}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.helpText}>
        <p>Don't have an account?&nbsp;</p>
        <Link className={css.linkToLogin} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
