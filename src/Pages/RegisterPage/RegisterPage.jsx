import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/selectors";
// import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  // const IsLoggedIn = useSelector(selectIsLoggedIn);
  // if (IsLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
