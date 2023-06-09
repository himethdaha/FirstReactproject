// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// 3rd party libraries
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const SignUpForm = ({
  handleFacebookCallbackResponse,
  handleInstagramCallbackResponse,
  handleInputOnChange,
  error,
  sent,
  setError,
  isSending,
  setUser,
  setShowForm,
  data,
  connFailedMessg,
}) => {
  // Event handler for signup form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError({});
    isSending(true);

    try {
      const responseData = await fetchData(
        "http://localhost:8000/",
        data,
        "POST"
      );
      if (responseData.status >= 400 && responseData.status <= 500) {
        throw responseData;
      } else if (responseData.status >= 500) {
        const err = {
          status: responseData.status,
          message: "Something went wrong on our side 🥹",
        };
        throw err;
      }
      // once validated
      else {
        setUser(responseData);
        setShowForm(false);
        isSending(false);
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

  // To close signup form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="form-container">
      <form
        className="form signUp-form"
        onSubmit={(e) => handleFormSubmit(e)}
        method="POST"
      >
        <div className="form-header">
          <h1 className="form-header-text">create an account</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn form-signup-close-btn"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <span className="form-tns signup-tns ">
          By creating an account, you agree to our <br />
          <Link className="form-tns-link" to={"/"}>
            Terms Of Service
          </Link>{" "}
          and{" "}
          <Link className="form-tns-link" to={"/"}>
            Privacy Policy
          </Link>
        </span>
        <label className="form-label form-label-signup" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="form-input form-input-signup"
          id="email"
          name="email"
          placeholder="pain@gmail.com"
          required={true}
          onChange={handleInputOnChange}
        ></input>
        {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )}
        <label className="form-label form-label-signup" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="form-input form-input-signup"
          id="username"
          name="username"
          placeholder="Kaiokenx10"
          required={true}
          onChange={handleInputOnChange}
        ></input>
        {error?.signUpError?.username && (
          <ErrorAlert message={error.signUpError.username} />
        )}
        <label className="form-label form-label-signup" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-input form-input-signup"
          id="password"
          name="password"
          required={true}
          onChange={handleInputOnChange}
        ></input>
        {error?.signUpError?.password && (
          <ErrorAlert message={error.signUpError.password} />
        )}
        <label
          className="form-label form-label-signup"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          className="form-input form-input-signup"
          id="passwordConfirm"
          name="passwordConfirm"
          required={true}
          onChange={handleInputOnChange}
        ></input>
        {sent && <ErrorAlert message={"Sending Info..."} status={200} />}
        {error?.signUpError?.passwordConfirm && (
          <ErrorAlert message={error.signUpError.passwordConfirm} />
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
        <button
          className="form-submit-btn"
          id="submit-btn-signup"
          type="submit"
        >
          <span>Create Account</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
