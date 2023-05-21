// Imports
import ErrorAlert from "../ErrorAlert";

// 3rd party libraries
import React from "react";
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
  handleLoginFormSubmit,
  handleCloseForm,
  error,
}) => {
  return (
    <div className="form-container">
      <form
        className="form signUp-form"
        onSubmit={(e) => handleLoginFormSubmit(e)}
        method="POST"
      >
        <div className="form-header-btn">
          <h1 className="form-header">Welcome Back</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <span className="form-tns login-tns">
          By creating an account, you agree to our <br />
          <a className="form-tns-link" href="/">
            Terms Of Service
          </a>{" "}
          and{" "}
          <a className="form-tns-link" href="/">
            Privacy Policy
          </a>
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
        {error?.username && <ErrorAlert message={error.username} />}
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
        {error?.password && <ErrorAlert message={error.password} />}
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
      </form>
    </div>
  );
};

export default LoginForm;
