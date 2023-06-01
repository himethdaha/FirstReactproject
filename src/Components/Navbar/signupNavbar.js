// 3rd party libraries
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// styles
import "../../css/Navbar.css";

const SignUp = ({ setShowForm, user, setUser, showProfile }) => {
  // Variables
  const isUserSet = Object.keys(user).length;

  // When isUserSet is changed run the below hook to disable/enable login btn
  useEffect(() => {
    const loginBtn = document.querySelector(".navbar-ul-login-btn");
    if (loginBtn) {
      if (isUserSet !== 0 && user.status === 200) {
        loginBtn.disabled = true;
        loginBtn.classList.add("hidden");
      } else {
        loginBtn.classList.remove("hidden");
        loginBtn.disabled = false;
      }
    }
  }, [isUserSet, user]);

  //Event handler on signup button which changes the "state"
  const handleOnClick = (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    if (isUserSet === 0) {
      setShowForm(true);
    }
    // This is when a user is signed in and clicks on the LogOut button
    else {
      setShowForm(false);
      // When user object is the 'state' is empty the LogOut button text will change to SignIn because isUserSet === 0
      setUser({});
      showProfile(false);
    }
  };
  return (
    <li className="navbar-ul-item">
      <Link
        to={"/"}
        className="navbar-ul-btn navbar-ul-signin-btn"
        onClick={(e) => handleOnClick(e)}
      >
        {isUserSet === 0 || user.status !== 200 ? "SignIn" : "LogOut"}
      </Link>
    </li>
  );
};

export default SignUp;
