// 3rd party libraries
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Styles
import "../../css/Navbar.css";

const LogIn = ({ setShowLoginForm, user, setUser, setHideSignUpButton }) => {
  // Variables
  const isUserSet = Object.keys(user).length;

  // When isUserSet is changed run the below hook to disable/enable signin btn
  useEffect(() => {
    const signinBtn = document.querySelector(".navbar-ul-signin-btn");
    if (signinBtn) {
      if (isUserSet !== 0 && user.status === 200) {
        signinBtn.disabled = true;
        signinBtn.classList.add("hidden");
      } else {
        signinBtn.classList.remove("hidden");
        signinBtn.disabled = false;
      }
    }
  }, [isUserSet, user]);
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
    }
  };
  return (
    <li className="navbar-ul-item">
      <Link
        to={"/"}
        className="navbar-ul-btn navbar-ul-signin-btn"
        onClick={(e) => handleOnClick(e)}
      >
        {isUserSet === 0 || user.status !== 200 ? "LogIn" : "LogOut"}
      </Link>
    </li>
  );
};

export default LogIn;
