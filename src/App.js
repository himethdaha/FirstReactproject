// My modules
import Navbar from "./Navbar";
import Home from "./Home";
import ErrorAlert from "./Components/ErrorAlert";

// Styles
import "./css/App.css";
import "./css/Form.css";
import close from "./logos/register/close.svg";

// 3rd party modules
import jwt_decode from "jwt-decode";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";

import React, { useEffect, useState } from "react";

// Env variables
const facebookAppId = process.env.REACT_APP_FACEBOOK_APPID;
const instagramClientId = process.env.REACT_APP_INSTAGRAM_CLIENTID;
const instagramClientSecret = process.env.REACT_APP_INSTAGRAM_CLIENTSECRET;
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// Stylings
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

function App() {
  // HOOKS //
  //"useState"

  //hook to close form
  const [showForm, setShowForm] = useState(false);

  //State to check if a user is logged in
  const [user, setUser] = useState({});

  //State to be triggered by errors in forms
  const [error, setError] = useState({});

  // "useEffect"

  // hook to initialize google accounts
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCallbackResponse,
    });
  }, []);

  // hook to initialize one-tamp prompt and render google button
  useEffect(() => {
    // One-tap prompt
    if (Object.keys(user).length === 0) {
      window.google.accounts.id.prompt();
    }

    // Create google sign in button
    window.google.accounts.id.renderButton(
      document.getElementById("google-OAuth-btn"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  // Event handlers //
  //Callback for google login
  const handleGoogleCallbackResponse = (response) => {
    console.log("response " + JSON.stringify(response));
    console.log("response.credential");
    console.log(response.credential);
    //Decode the JWT from the response
    const userObject = jwt_decode(response.credential);
    //Set user state
    setUser(userObject);
  };

  //Callback for facebook login
  const handleFacebookCallbackResponse = (response) => {
    console.log("response " + response);
    //Decode the JWT from the response
    //Set user state
    setUser(response);
  };

  //Callback for instagram login
  const handleInstagramCallbackResponse = (response) => {
    console.log("response ");
    console.log(response);
  };

  // To handle form inputs
  const handleInputOnChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    let passwd;
    let currPasswd;
    let errors = {};

    // Validate the email address
    if (eventName === "email") {
      if (eventValue.length === 0) {
        errors.email = "Email is missing";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
        )
      ) {
        errors.email = "Email is invalid";
      }
    }
    // Validate the username
    else if (eventName === "username") {
      if (eventValue.length === 0) {
        errors.username = "Username is missing";
      }
    }
    // Validate the password
    else if (eventName === "password") {
      if (eventValue.length === 0) {
        errors.password = "Password is missing";
      } else if (
        !eventValue.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
        )
      ) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one number and at least 6 characters";
      } else {
      }
    }
    // Validate the confirm password
    else if (eventName === "password-confirm") {
      if (!("password" in errors)) {
        passwd = document.getElementById("password");
        currPasswd = passwd.value;
      }

      if (eventValue.length === 0) {
        errors.passwordConfirm = "Confirm Password is missing";
      } else if (eventValue !== currPasswd) {
        errors.passwordConfirm = "Confirm Password invalid";
      }
    }
    setError(errors);
  };

  // To handle form submission
  const handleFormSubmit = (response) => {};

  // To close the form
  const handleCloseForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <React.Fragment>
      {/*If ShowForm state is true*/}
      {showForm && (
        <div className="form-container">
          <form className="form signUp-form">
            <div className="form-header-btn">
              <h1 className="form-header">create an account</h1>
              <img
                src={close}
                alt="Form close button"
                className="form-close-btn"
                onClick={(e) => handleCloseForm(e)}
              ></img>
            </div>
            <span className="form-tns">
              By creating an account, you agree to our <br />
              <a className="form-tns-link" href="/">
                Terms Of Service
              </a>{" "}
              and{" "}
              <a className="form-tns-link" href="/">
                Privacy Policy
              </a>
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
            {error?.email && <ErrorAlert message={error.email} />}
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
            {error?.username && <ErrorAlert message={error.username} />}
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
            {error?.password && <ErrorAlert message={error.password} />}
            <label
              className="form-label form-label-signup"
              htmlFor="password-confirm"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-input form-input-signup"
              id="password-confirm"
              name="password-confirm"
              required={true}
              onChange={handleInputOnChange}
            ></input>
            {error?.passwordConfirm && (
              <ErrorAlert message={error.passwordConfirm} />
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
              onClick={(e) => handleFormSubmit(e)}
            >
              <span>Create Account</span>
            </button>
          </form>
        </div>
      )}
      <div className="App">
        <header className="App-header">
          {/*Send in the setShowForm and user state as props to Navbar*/}
          <Navbar setShowForm={setShowForm} user={user} setUser={setUser} />
        </header>
        <main className="Main">
          <Home user={user} />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
