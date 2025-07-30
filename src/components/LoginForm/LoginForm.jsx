import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../redux/operations";
import { selectIsLoading } from "../../redux/selectors";
// import { toast } from "react-toastify";
import css from "./LoginForm.module.css";

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
          alert(error.message);
        } else {
          alert("Unauthorized error");
        }
      }
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>
      <p className={css.text}>
        Join our community of mindfulness and wellbeing!
      </p>
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
