import { Form, Formik, Field } from "formik";
import {} from "formik";
import React from "react";

const RegisterForm = () => {
  const initialValues = { name: "", email: "", password: "" };
  const handleSubmit = (values, options) => {
    console.log(values);
  };
  return (
    <div>
      <h1>RegisterForm</h1>
      <p>Join our community of mindfulness and wellbeing!</p>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <label>Enter your name</label>
            <Field name="name" type="name" placeholder="Max" />
            <label>Enter your email address</label>
            <Field name="email" type="email" placeholder="email@gmail.com" />
            <label>Create a strong password</label>
            <Field name="password" type="password" placeholder="*********" />
            {/* <label>Repeat your password</label>
            <Field name="" type="" placeholder="*********" /> */}
            <button type="submit">Create account</button>
          </Form>
        </Formik>
      </div>
      <p>Already have an account?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default RegisterForm;
