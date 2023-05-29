// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// 3rd party libraries
import React from "react";
import { Link } from "react-router-dom";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";

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
  handleInputOnLoginChange,
  setShowLoginForm,
  showPasswordResetForm,
  error,
  sent,
  setError,
  isSending,
  setUser,
  showUserBlocked,
  setUserBlockedPopup,
  connFailedMessg,
  loginData,
  showProfile,
}) => {
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

      // Check if backend response is invalid username/password
      if (responseData.status === 400 || responseData.status === 429) {
        isSending(false);
        const loginError = {
          password: responseData.message,
        };

        setError((prevError) => ({
          ...prevError,
          loginError: loginError,
        }));
      }
      // 403 for blocked users
      else if (responseData.status === 403) {
        isSending(false);
        // Close the form
        setShowLoginForm(false);
        setUser(responseData);
        showUserBlocked(true);
        // To show popup
        setUserBlockedPopup(true);
      }
      // For server errors
      else if (responseData.status >= 500) {
        isSending(false);
        const loginError = {
          password: responseData.message,
        };

        setError((prevError) => ({
          ...prevError,
          loginError: loginError,
        }));
      }
      // Once validated
      else {
        setUser(responseData);
        setShowLoginForm(false);
        showUserBlocked(false);
        isSending(false);
        showProfile(true);
      }
    } catch (error) {
      isSending(false);

      const message = error.message;

      if (message === connFailedMessg) {
        const loginError = {
          password: "Connection to server failed",
        };

        setError((prevError) => ({
          ...prevError,
          loginError: loginError,
        }));
      }
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
            onClick={(e) => handleCloseForm()}
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
          onChange={handleInputOnLoginChange}
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
          onChange={handleInputOnLoginChange}
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
