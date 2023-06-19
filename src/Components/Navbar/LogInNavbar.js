import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// 3rd party libraries
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Styles
import "../../css/Navbar.css";

const LogIn = ({ setShowLoginForm, loggedIn, setloggedIn }) => {
  // When isUserSet is changed run the below hook to disable/enable signin btn
  useEffect(() => {
    const signinBtn = document.querySelector(".navbar-ul-signin-btn");
    if (signinBtn) {
      if (loggedIn) {
        signinBtn.disabled = true;
        signinBtn.classList.add("hidden");
      } else {
        signinBtn.classList.remove("hidden");
        signinBtn.disabled = false;
      }
    }
  }, [loggedIn]);
  //Event handler on signup button which changes the "state"
  const handleOnClick = async (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    if (!loggedIn) {
      setShowLoginForm(true);
    }
    // This is when a user is signed in and clicks on the LogOut button
    else {
      try {
        await fetchData("http://localhost:8000/logout", null, "POST");
        // When user object in the 'state' is empty the LogOut button text will change to SignIn because isUserSet === 0
        setloggedIn(false);
        localStorage.clear();
      } catch (error) {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <li className="navbar-ul-item">
      <Link
        to={"/"}
        className="navbar-ul-btn navbar-ul-signin-btn"
        onClick={(e) => handleOnClick(e)}
      >
        {!loggedIn ? "LogIn" : "LogOut"}
      </Link>
    </li>
  );
};

export default LogIn;
