import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/selectors";
// import { Navigate } from "react-router-dom";

const LoginPage = () => {
  // const IsLoggedIn = useSelector(selectIsLoggedIn);
  // if (IsLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
