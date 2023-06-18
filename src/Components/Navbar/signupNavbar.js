import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// 3rd party libraries
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// styles
import "../../css/Navbar.css";
// import { AuthContext } from "../../utils/helperFunctions/authContext";

const SignUp = ({ setShowForm, loggedIn, setloggedIn }) => {
  // When isUserSet is changed run the below hook to disable/enable login btn
  useEffect(() => {
    const loginBtn = document.querySelector(".navbar-ul-login-btn");
    if (loginBtn) {
      if (loggedIn) {
        loginBtn.disabled = true;
        loginBtn.classList.add("hidden");
      } else {
        loginBtn.classList.remove("hidden");
        loginBtn.disabled = false;
      }
    }
  }, [loggedIn]);

  //Event handler on signup button which changes the "state"
  const handleOnClick = async (e) => {
    e.preventDefault();
    //Set the state of the form visibility to true and this will propogate to App.js
    if (!loggedIn) {
      setShowForm(true);
    }
    // This is when a user is signed in and clicks on the LogOut button
    else {
      try {
        await fetchData("http://localhost:8000/logout", null, "POST");
        // When user object in the 'state' is empty the LogOut button text will change to SignIn because isUserSet === 0
        setloggedIn(false);
        localStorage.removeItem("loggedIn");
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
        {!loggedIn ? "SignIn" : "LogOut"}
      </Link>
    </li>
  );
};

export default SignUp;
