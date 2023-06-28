// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";
import { handleInputOnLoginChange } from "../../utils/eventHandlers/eventHandler";
import useEnableSubmitBtn from "../../utils/customHooks/submitBtnEnable";

// 3rd party libraries
import { React, useState } from "react";

import { Link } from "react-router-dom";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const formSocialSignupBtn = {
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  gap: "0.5rem",
  alignItems: "center",
  paddingTop: "0.4rem",
  paddingBottom: "0.4rem",
  border: "none",
  borderRadius: "0.5rem",
  height: "4rem",
  fontSize: "1rem",
  transition: "transform 0.2s ease-in-out",
  transformOrigin: "top",
  boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.3)",
};

// Env variables
const facebookAppId = process.env.REACT_APP_FACEBOOK_APPID;
const instagramClientId = process.env.REACT_APP_INSTAGRAM_CLIENTID;
const instagramClientSecret = process.env.REACT_APP_INSTAGRAM_CLIENTSECRET;

const LoginForm = ({
  handleFacebookCallbackResponse,
  handleInstagramCallbackResponse,
  setShowLoginForm,
  showPasswordResetForm,
  sent,
  isSending,
  showUserBlocked,
  setUserBlockedPopup,
  setloggedIn,
}) => {
  // State to see if every field has been validated in login form
  const [validLoginData, validateLoginData] = useState({
    username: false,
    password: false,
  });

  //State to be triggered by errors in forms
  const [error, setError] = useState({
    signUpError: {},
    loginError: {},
    passwordResetError: {},
    newPasswordSubmit: {},
    userUpdate: {},
    status: 400,
  });

  // State to save login form data
  const [loginData, setLoginForm] = useState({
    "login-username": "",
    "login-password": "",
  });

  // Hook for login form to enable/disable submit button
  useEnableSubmitBtn(validLoginData, "submit-btn-login");

  // To handle Login form submission
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    setError({});
    isSending(true);

    try {
      const responseData = await fetchData(
        "http://localhost:8000/login",
        loginData,
        "POST"
      );
      console.log(
        "🚀 ~ file: LoginForm.js:74 ~ handleLoginFormSubmit ~ login responseData:",
        responseData
      );
      // Check if backend response is invalid username/password
      if (responseData.status >= 400 && responseData.status <= 500) {
        throw responseData;
      } else if (responseData.status >= 500) {
        const err = {
          status: responseData.status,
          message: "Something went wrong on our side 🥹",
        };
        throw err;
      }
      // 403 for blocked users
      else if (responseData.status === 403) {
        isSending(false);
        // Close the form
        setShowLoginForm(false);
        localStorage.setItem("userName", responseData.userName);
        showUserBlocked(true);
        // To show popup
        setUserBlockedPopup(true);
      }
      // Once validated
      else {
        // Set logged in state
        setloggedIn(true);
        localStorage.setItem("loggedIn", true);

        // Store username
        localStorage.setItem("userName", responseData.userName);

        // Generate default user image
        // Store the base46 encoded string
        const encodedImage = responseData.image;
        localStorage.setItem("encodedImage", encodedImage);

        // Close form
        setShowLoginForm(false);
        isSending(false);

        // If max login attempts
        showUserBlocked(false);
      }
    } catch (error) {
      isSending(false);
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
  };

  // To close the login form
  const handleCloseForm = () => {
    setShowLoginForm(false);
  };
  // To show the forgot password form
  const showPasswordResetOnClick = (event) => {
    event.preventDefault();
    showPasswordResetForm(true);
    // Close login form
    setShowLoginForm(false);
  };
  return (
    <div className="form-container">
      <form
        className="form signUp-form"
        onSubmit={(e) => handleLoginFormSubmit(e)}
        method="POST"
      >
        <div className="form-header">
          <h1 className="form-header-text">Welcome Back</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn form-login-close-btn"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <span className="form-tns login-tns">
          By creating an account, you agree to our <br />
          <Link className="form-tns-link" to={"/"}>
            Terms Of Service
          </Link>{" "}
          and{" "}
          <Link className="form-tns-link" to={"/"}>
            Privacy Policy
          </Link>
        </span>
        <label className="form-label form-label-signup" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="form-input form-input-signup"
          id="login-username"
          name="login-username"
          placeholder="Kaiokenx10"
          required={true}
          onChange={(event) =>
            handleInputOnLoginChange(
              event,
              validateLoginData,
              validLoginData,
              setError,
              setLoginForm,
              loginData
            )
          }
        ></input>
        {error?.loginError?.username && (
          <ErrorAlert message={error.loginError.username} />
        )}
        <label className="form-label form-label-signup" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-input form-input-signup"
          id="login-password"
          name="login-password"
          required={true}
          onChange={(event) =>
            handleInputOnLoginChange(
              event,
              validateLoginData,
              validLoginData,
              setError,
              setLoginForm,
              loginData
            )
          }
        ></input>
        {sent && <ErrorAlert message={"Sending Info..."} status={200} />}
        {error?.loginError?.password && (
          <ErrorAlert message={error.loginError.password} />
        )}
        <div className="form-social-signup">
          {/* Login from Facebook */}
          <LoginSocialFacebook
            appId={facebookAppId}
            autoLoad={true}
            fields="name,email,picture"
            callback={handleFacebookCallbackResponse}
          >
            <FacebookLoginButton style={formSocialSignupBtn} />
          </LoginSocialFacebook>
          {/* Login from Instagram */}
          <LoginSocialInstagram
            client_id={instagramClientId}
            client_secret={instagramClientSecret}
            redirect_uri="https://localhost:3000/"
            callback={handleInstagramCallbackResponse}
          >
            <InstagramLoginButton style={formSocialSignupBtn} />
          </LoginSocialInstagram>
          {/* Login from Google */}
          <div id="google-OAuth-btn" style={formSocialSignupBtn}></div>
        </div>
        <button className="form-submit-btn" id="submit-btn-login" type="submit">
          <span>Login</span>
        </button>
        <Link
          to={"/"}
          className="forgot-password-link"
          onClick={showPasswordResetOnClick}
        >
          Forgot Password
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
