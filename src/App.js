import "./css/App.css";
import "./css/Form.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  //"useState" hook
  const [showForm, setShowForm] = useState(false);
  return (
    <React.Fragment>
      {/*If ShowForm state is true*/}
      {showForm && (
        <div className="form-container">
          <form className="form signUp-form">
            <h1 className="form-header">create an account</h1>
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
