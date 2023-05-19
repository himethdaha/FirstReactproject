import React from "react";
import "../../css/Navbar.css";

const LogIn = ({ setShowLoginForm, user, setUser, setHideSignUpButton }) => {
  // Variables
  const isUserSet = Object.keys(user).length;

  //Event handler on signup button which changes the "state"
  const handleOnClick = (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    if (isUserSet === 0) {
      setShowLoginForm(true);
    }
    // This is when a user is signed in and clicks on the LogOut button
    else {
      setShowLoginForm(false);
      // When user object is the 'state' is empty the LogOut button text will change to SignIn because isUserSet === 0
      setUser({});
      // Enable SignUp Button
      setHideSignUpButton(false);
    }
  };
  if (isUserSet === 0) {
    return (
      <li className="navbar-ul-item">
        <a
          href="/"
          className="navbar-ul-btn navbar-ul-login-btn"
          onClick={(e) => handleOnClick(e)}
        >
          LogIn
        </a>
      </li>
    );
  } else {
    // To sign up button
    setHideSignUpButton(true);
    return (
      <li className="navbar-ul-item">
        <a
          href="/"
          className="navbar-ul-btn navbar-ul-login-btn"
          onClick={(e) => handleOnClick(e)}
        >
          LogOut
        </a>
      </li>
    );
  }
};

export default LogIn;
