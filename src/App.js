// My modules
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home";
import SignUpForm from "./Components/Registration/SignupForm";
import LoginForm from "./Components/Registration/LoginForm";

// Styles
import "./css/App.css";

// 3rd party libraries
import jwt_decode from "jwt-decode";

import React, { useEffect, useState } from "react";

// Env variables
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// Stylings

function App() {
  // HOOKS //
  //"useState"

  //hook to open/close sign up form
  const [showForm, setShowForm] = useState(false);

  // hook to open/close login form
  const [showLoginForm, setShowLoginForm] = useState(false);

  // To hide signup button when user logged in
  const [signUpHidden, setHideSignUpButton] = useState(false);

  // To hide login button when user signed in
  const [loginHidden, setHideLoginButton] = useState(false);

  //State to check if a user is logged in
  const [user, setUser] = useState({});

  //State to be triggered by errors in forms
  const [error, setError] = useState({});

  // State to save signup form data
  const [data, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  // State to save login form data
  const [loginData, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // State to see if every field has been validated in signup form
  const [validData, validateData] = useState({
    email: false,
    username: false,
    password: false,
    passwordConfirm: false,
  });

  // State to see if every field has been validated in login form
  const [validLoginData, validateLoginData] = useState({
    username: false,
    password: false,
  });

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

  // Run this hook every time 'validData' object changes to make sure the asynchronous state changes are rendered correctly
  useEffect(() => {
    const signupAllIsValid = Object.values(validData).every((element) => {
      return element === true ? true : false;
    });

    const loginAllIsValid = Object.values(validLoginData).every((element) => {
      return element === true ? true : false;
    });
    const submitBtn = document.getElementById("submit-btn");

    if ((signupAllIsValid || loginAllIsValid) && submitBtn) {
      console.log("VALID");
      submitBtn.disabled = false;
      submitBtn.classList.add("enabled");
    }
    if (!signupAllIsValid && !loginAllIsValid && submitBtn) {
      console.log("INVALID");
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.disabled = true;
      submitBtn.classList.remove("enabled");
    }
  }, [validData, validLoginData]);

  // Event handlers //
  //Callback for google login
  const handleGoogleCallbackResponse = (response) => {
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
    // Close form
    setShowForm(false);
  };

  //Callback for instagram login
  const handleInstagramCallbackResponse = (response) => {
    console.log("response ");
    console.log(response);
    // Close form
    setShowForm(false);
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
        errors.email = "Email address is required";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
        )
      ) {
        errors.email = "Email is invalid";
      } else {
        validateData({ ...validData, email: true });
      }
    }
    // Validate the username
    else if (eventName === "username" || eventName === "login-username") {
      if (eventValue.length === 0) {
        errors.username = "Username is required";
      } else if (eventValue.length > 10) {
        errors.username = "Username can't be longer than 10 characters";
      } else {
        validateData({ ...validData, username: true });
        validateLoginData({ ...validLoginData, username: true });
      }
    }
    // Validate the password
    else if (eventName === "password" || eventName === "login-password") {
      if (eventValue.length === 0) {
        errors.password = "Password is required";
      } else if (
        !eventValue.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
        )
      ) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 6 characters";
      } else {
        validateData({ ...validData, password: true });
        validateLoginData({ ...validLoginData, password: true });
      }
    }
    // Validate the confirm password
    else if (eventName === "passwordConfirm") {
      if (!("password" in errors)) {
        passwd = document.getElementById("password");
        currPasswd = passwd.value;
      }

      if (eventValue.length === 0) {
        errors.passwordConfirm = "Confirm Password is required";
        validateData({ ...validData, passwordConfirm: false });
      } else if (eventValue !== currPasswd) {
        errors.passwordConfirm = "Confirm Password invalid";
        validateData({ ...validData, passwordConfirm: false });
      } else {
        validateData({ ...validData, passwordConfirm: true });
      }
    }
    console.log("errors", errors);
    setError(errors);
    // Save form data
    setForm({ ...data, [eventName]: eventValue });
    setLoginForm({ ...loginData, [eventName]: eventValue });

    console.log("valid data");
    console.log(validData);
    console.log(validLoginData);
  };

  // To handle SignUp form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Send data to server
    const response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //Get the data from server response
    const responseData = await response.json();
    console.log(responseData);

    setUser(responseData);

    setShowForm(false);
  };

  // To handle Login form submission
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validLoginData),
    });

    const responseData = await response.json();
    console.log(responseData);

    setShowForm(false);
  };

  // To close the form
  const handleCloseForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowLoginForm(false);
  };

  return (
    <React.Fragment>
      {/*If ShowForm state for signup is true*/}
      {showForm && (
        <SignUpForm
          handleFacebookCallbackResponse={handleFacebookCallbackResponse}
          handleInstagramCallbackResponse={handleInstagramCallbackResponse}
          handleInputOnChange={handleInputOnChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseForm={handleCloseForm}
          error={error}
        />
      )}
      {/*If ShowForm state for login is true*/}
      {showLoginForm && (
        <LoginForm
          handleFacebookCallbackResponse={handleFacebookCallbackResponse}
          handleInstagramCallbackResponse={handleInstagramCallbackResponse}
          handleInputOnChange={handleInputOnChange}
          handleLoginFormSubmit={handleLoginFormSubmit}
          handleCloseForm={handleCloseForm}
          error={error}
        />
      )}
      <div className="App">
        <header className="App-header">
          {/*Send in the setShowForm and user state as props to Navbar*/}
          <Navbar
            setShowForm={setShowForm}
            setShowLoginForm={setShowLoginForm}
            user={user}
            setUser={setUser}
            setHideSignUpButton={setHideSignUpButton}
            setHideLoginButton={setHideLoginButton}
            signUpHidden={signUpHidden}
            loginHidden={loginHidden}
          />
        </header>
        <main className="Main">
          <Home user={user} />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
