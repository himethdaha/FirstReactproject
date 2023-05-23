// My modules
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home";
import SignUpForm from "./Components/Registration/SignupForm";
import LoginForm from "./Components/Registration/LoginForm";
import ForgotPasswordForm from "./Components/Registration/forgotPassword";
import UserBlocked from "./Components/Alerts/UserBlocked";

// Styles
import "./css/App.css";

// 3rd party libraries
import jwt_decode from "jwt-decode";

import React, { useEffect, useState } from "react";

// Env variables
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// Stylings

function App() {
  let response;
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

  // To hide user blocked popup
  const [showUserBlockedPopup, setUserBlockedPopup] = useState(false);

  // To hide/show the password reset form
  const [passwordResetForm, showPasswordResetForm] = useState(false);

  //State to check if a user is logged in
  const [user, setUser] = useState({});

  //State to be triggered by errors in forms
  const [error, setError] = useState({
    signUpError: {},
    loginError: {},
    passwordResetError: {},
  });

  // State to save signup form data
  const [data, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  // State to save login form data
  const [loginData, setLoginForm] = useState({
    "login-username": "",
    "login-password": "",
  });

  // State to save reset password form
  const [passwordResetData, setPasswordResetForm] = useState({
    passwordResetEmail: "",
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

  // State to see if email is provided in forgot-password
  const [validPasswordReset, validatedPasswordReset] = useState({
    email: false,
  });

  // State to show a user has been blocked
  const [userBlocked, showUserBlocked] = useState(false);

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

    const signupSubmitBtn = document.getElementById("submit-btn-signup");

    if (signupAllIsValid && signupSubmitBtn) {
      signupSubmitBtn.disabled = false;
      signupSubmitBtn.classList.add("enabled");
    }
    if (!signupAllIsValid && signupSubmitBtn) {
      signupSubmitBtn.disabled = true;
      signupSubmitBtn.classList.remove("enabled");
    }
  }, [validData]);

  // Hook for login form to enable/disable submit button
  useEffect(() => {
    const loginAllIsValid = Object.values(validLoginData).every((element) => {
      return element === true ? true : false;
    });

    const loginSubmitBtn = document.getElementById("submit-btn-login");

    if (loginAllIsValid && loginSubmitBtn) {
      console.log("VALID login");
      loginSubmitBtn.disabled = false;
      loginSubmitBtn.classList.add("enabled");
    }
    if (!loginAllIsValid && loginSubmitBtn) {
      console.log("INVALID");
      loginSubmitBtn.disabled = true;
      loginSubmitBtn.classList.remove("enabled");
    }
  }, [validLoginData]);

  // Hook to enable submitting the reset password form
  useEffect(() => {
    const resetPassAllIsValid = Object.values(validPasswordReset).every(
      (element) => {
        return element === true ? true : false;
      }
    );
    console.log(resetPassAllIsValid);
    const resetPassSubmitBtn = document.getElementById(
      "resetPassword-form-btn"
    );

    if (resetPassAllIsValid && resetPassSubmitBtn) {
      resetPassSubmitBtn.disabled = false;
      resetPassSubmitBtn.classList.add("enabled");
    }
    if (!resetPassAllIsValid && resetPassSubmitBtn) {
      resetPassSubmitBtn.disabled = true;
      resetPassSubmitBtn.classList.remove("enabled");
    }
  }, [validPasswordReset]);

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

  // To handle signin form inputs
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
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
        )
      ) {
        errors.email = "Email is invalid";
      } else {
        validateData({ ...validData, email: true });
      }
    }
    // Validate the username
    else if (eventName === "username") {
      if (eventValue.length === 0) {
        errors.username = "Username is required";
      } else if (eventValue.length > 10) {
        errors.username = "Username can't be longer than 10 characters";
      } else {
        validateData({ ...validData, username: true });
      }
    }
    // Validate the password
    else if (eventName === "password") {
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
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setError((prevError) => ({
        ...prevError,
        signUpError: errors,
      }));
    } else {
      // Save form data
      setForm({ ...data, [eventName]: eventValue });
      // Empty the errors
      setError((prevError) => ({
        ...prevError,
        signUpError: {},
      }));
    }
  };

  // To handle login form inputs
  const handleInputOnLoginChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    let errors = {};

    // Validate the username
    if (eventName === "login-username") {
      if (eventValue.length === 0) {
        errors.username = "Username is required";
      } else if (eventValue.length > 10) {
        errors.username = "Username can't be longer than 10 characters";
      } else {
        validateLoginData({ ...validLoginData, username: true });
      }
    }
    // Validate the password
    else if (eventName === "login-password") {
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
        validateLoginData({ ...validLoginData, password: true });
      }
    }

    if (Object.keys(errors).length > 0) {
      setError((prevError) => ({
        ...prevError,
        loginError: errors,
      }));
    } else {
      // Save form data
      setLoginForm({ ...loginData, [eventName]: eventValue });
      // Empty the errors
      setError((prevError) => ({
        ...prevError,
        loginError: {},
      }));
    }
  };
  const handleInputOnPasswordChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    let errors = {};

    if (eventName === "passwordResetEmail") {
      if (eventValue.length === 0) {
        errors.email = "Email address is required";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
        )
      ) {
        errors.email = "Email is invalid";
      } else {
        validatedPasswordReset({ ...validPasswordReset, email: true });
      }
    }
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setError((prevError) => ({
        ...prevError,
        passwordResetError: errors,
      }));
    } else {
      // Save form data
      setPasswordResetForm({ ...passwordResetData, [eventName]: eventValue });
      // Empty the errors
      setError((prevError) => ({
        ...prevError,
        passwordResetError: {},
      }));
    }
  };

  // To handle SignUp form submission
  const handleFormSubmit = async (event) => {
    console.log("signup form submission", event);
    event.preventDefault();

    // Send data to server
    response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //Get the data from server response
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status >= 400) {
      const signupError = {
        passwordConfirm: responseData.message,
      };

      setError((prevError) => ({
        ...prevError,
        signUpError: signupError,
      }));
    }
    // once validated
    else {
      setUser(responseData);
      setShowForm(false);
    }
  };

  // To handle Login form submission
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // Returns a JWT
    const responseData = await response.json();
    console.log(responseData);

    // Check if backend response is invalid username/password
    if (responseData.status === 400 || responseData.status === 429) {
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
      // Close the form
      setShowLoginForm(false);
      setUser(responseData);
      showUserBlocked(true);
      // To show popup
      setUserBlockedPopup(true);
    }
    // For server errors
    else if (responseData.status >= 500) {
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
    }
  };

  // To handle forgot password form submission
  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();
    console.log("data send", passwordResetData);
    const response = await fetch("http://localhost:8000/forgot_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordResetData),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status >= 400) {
      console.log("error");
      const passwordResetError = {
        passwordResetEmail: responseData.message,
      };

      setError((prevError) => ({
        ...prevError,
        passwordResetError: passwordResetError,
      }));
    } else {
      // setUser(responseData);
      showPasswordResetForm(false);
    }
  };

  // To close the form
  const handleCloseForm = (e) => {
    console.log("closed event", e);
    e.preventDefault();
    setShowForm(false);
    setShowLoginForm(false);
    setUserBlockedPopup(false);
    showPasswordResetForm(false);
    // Clear the error object
    setError({});
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
          handleInputOnLoginChange={handleInputOnLoginChange}
          handleLoginFormSubmit={handleLoginFormSubmit}
          handleCloseForm={handleCloseForm}
          setShowLoginForm={setShowLoginForm}
          showPasswordResetForm={showPasswordResetForm}
          error={error}
        />
      )}
      {showUserBlockedPopup && (
        <UserBlocked user={user} handleCloseForm={handleCloseForm} />
      )}
      {passwordResetForm && (
        <ForgotPasswordForm
          handleInputOnPasswordChange={handleInputOnPasswordChange}
          handlePasswordResetSubmit={handlePasswordResetSubmit}
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
            userBlocked={userBlocked}
            user={user}
            setUser={setUser}
            setHideSignUpButton={setHideSignUpButton}
            setHideLoginButton={setHideLoginButton}
            signUpHidden={signUpHidden}
            loginHidden={loginHidden}
          />
        </header>
        <main className="Main">
          <Home user={user} userBlocked={userBlocked} />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
