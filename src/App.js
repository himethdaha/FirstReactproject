import "./css/App.css";
import "./css/Form.css";
import close from "./logos/register/close.svg";
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
import Navbar from "./Navbar";
import Home from "./Home";

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
  //"useState" hook
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  //State to check if a user is logged in
  const [user, setUser] = useState({});

  //Callback for google login
  const handleGoogleCallbackResponse = (response) => {
    console.log("response " + JSON.stringify(response));
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

  // UseEffect hook
  useEffect(() => {
    //Initialize google client
    window.google.accounts.id.initialize({
      client_id:
        "151653347062-bsi5vgnsd1bt3e84802e0ufjsh9smlom.apps.googleusercontent.com",
      callback: handleGoogleCallbackResponse,
    });
  }, []);

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
              placeholder="pain@gmail.com"
            ></input>
            <label className="form-label form-label-signup" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="form-input form-input-signup"
              id="username"
              placeholder="Kaiokenx10"
            ></input>
            <label className="form-label form-label-signup" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-input form-input-signup"
              id="password"
            ></input>
            <div className="form-social-signup">
              {/* Login from Facebook */}
              <LoginSocialFacebook
                appId="904821693907392"
                autoLoad={true}
                fields="name,email,picture"
                callback={handleFacebookCallbackResponse}
              >
                <FacebookLoginButton style={formSocialSignupBtn} />
              </LoginSocialFacebook>
              {/* Login from Instagram */}
              <LoginSocialInstagram
                client_id="204841035647325"
                client_secret="16d3ab3180134c11adb207114d3db486"
                redirect_uri="https://localhost:3000/"
                callback={handleInstagramCallbackResponse}
              >
                <InstagramLoginButton style={formSocialSignupBtn} />
              </LoginSocialInstagram>
              {/* Login from Google */}
              {/* <LoginSocialGoogle
                client_id="151653347062-bsi5vgnsd1bt3e84802e0ufjsh9smlom.apps.googleusercontent.com"
                autoLoad={true}
                fields="name,email,picture"
                onResolve={({ provider, data }) => {
                  console.log("provider: " + provider);
                  console.log("typeof" + typeof provider);
                  setUser(data);
                }}
              >
                <GoogleLoginButton style={formSocialSignupBtn} />
              </LoginSocialGoogle> */}
              <div id="google-OAuth-btn" style={formSocialSignupBtn}></div>
            </div>
            <button className="form-submit-btn">
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
