import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";

import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/operations";

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = { name: "", email: "", password: "" };
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(loginUser(values));
  };
  return (
    <div>
      <h1>RegisterForm</h1>
      <p>Join our community of mindfulness and wellbeing!</p>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <label>Enter your email address</label>
            <Field name="email" type="email" placeholder="email@gmail.com" />
            <label>Enter a password</label>
            <Field name="password" type="password" placeholder="*********" />

            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginForm;
