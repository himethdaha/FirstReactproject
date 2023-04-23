import React from "react";
import "./css/Navbar.css";

const SignUp = (props) => {
  const setShowForm = props.setShowForm;

  //Event handler on signup button which changes the "state"
  const handleOnClick = (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    setShowForm(true);
  };
  return (
    <li className="navbar-ul-item">
      <a
        href="/"
        className="navbar-ul-btn navbar-ul-signin-btn"
        onClick={(e) => handleOnClick(e)}
      >
        SignIn
      </a>
    </li>
  );
};

export default SignUp;
