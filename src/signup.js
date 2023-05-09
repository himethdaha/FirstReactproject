import React from "react";
import "./css/Navbar.css";

const SignUp = ({ setShowForm, user, setUser }) => {
  // Variables
  const isUserSet = Object.keys(user).length;

  //Event handler on signup button which changes the "state"
  const handleOnClick = (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    if (isUserSet === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
      setUser({});
    }
  };
  return (
    <li className="navbar-ul-item">
      <a
        href="/"
        className="navbar-ul-btn navbar-ul-signin-btn"
        onClick={(e) => handleOnClick(e)}
      >
        {isUserSet === 0 ? "SignIn" : "LogOut"}
      </a>
    </li>
  );
};

export default SignUp;
