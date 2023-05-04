import "./css/App.css";
import "./css/Form.css";
import close from "./logos/register/close.svg";
import facebook from "./logos/register/facebook.svg";
import instagram from "./logos/register/instagram.svg";
import google from "./logos/register/google.svg";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  //"useState" hook
  const [showForm, setShowForm] = useState(false);
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
              <button className="form-social-signup-btn facebook">
                <img
                  src={facebook}
                  alt="Form Facebook button"
                  className="form-socials-icon facebook-icon"
                ></img>
                signup with facebook
              </button>
              <button className="form-social-signup-btn instagram">
                <img
                  src={instagram}
                  alt="Form Instagram button"
                  className="form-socials-icon instagram-icon"
                ></img>
                signup with instagram
              </button>
              <button className="form-social-signup-btn google">
                <img
                  src={google}
                  alt="Form Google button"
                  className="form-socials-icon google-icon"
                ></img>
                signup with google
              </button>
            </div>
            <button className="form-submit-btn">
              <span>Create Account</span>
            </button>
          </form>
        </div>
      )}
      <div className="App">
        <header className="App-header">
          {/*Send in the setShowForm value as a prop to Navbar*/}
          <Navbar setShowForm={setShowForm} />
        </header>
        <main className="Main">
          <Home />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
