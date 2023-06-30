// Imports
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home";
import SignUpForm from "./Components/Registration/SignupForm";
import VerificationPage from "./Components/Registration/verificationPage";
import LoginForm from "./Components/Registration/LoginForm";
import UserAccount from "./Components/User/UserAccount";
import ForgotPasswordForm from "./Components/Registration/forgotPassword";
import ResetPasswordForm from "./Components/Registration/resetPassword";
import UserBlocked from "./Components/Alerts/UserBlocked";

// Styles
import "./css/App.css";

// 3rd party libraries
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

// Env variables
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// To get all the years
const curr = new Date();
const pastMS = new Date().setFullYear(curr.getFullYear() - 70);
const pastDate = new Date(pastMS);

const years = [];
const current = new Date();
for (let year = pastDate.getFullYear(); year <= current.getFullYear(); year++) {
  years.push(year.toString());
}

const App = () => {
  // HOOKS //
  //hook to open/close sign up form
  const [showForm, setShowForm] = useState(false);

  // hook to open/close login form
  const [showLoginForm, setShowLoginForm] = useState(false);

  // To show the user profile link
  const [loggedIn, setloggedIn] = useState(false);

  // To hide user blocked popup
  const [showUserBlockedPopup, setUserBlockedPopup] = useState(false);

  // To hide/show the password reset form
  const [passwordResetForm, showPasswordResetForm] = useState(false);

  // To hide/show password reset form
  const [newPasswordForm, showNewPasswordForm] = useState(false);

  // To hide/show user account  form
  const [userForm, showUserForm] = useState(false);

  // To hide/show user verification page
  const [showVerificationPage, setVerificationPage] = useState(false);
  // State to show sending forgot password email
  const [sent, isSending] = useState(false);

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
    if (!loggedIn) {
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

  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    if (logged) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  }, []);

  // Hook to get the token off the url
  const [resetToken, setResetToken] = useState();
  function ResetPassword() {
    const { token } = useParams();
    console.log("🚀 ~ file: App.js:109 ~ AppLayout ~ token:", token);
    useEffect(() => {
      if (token) {
        showNewPasswordForm(true);
        setResetToken(resetToken);
      }
    }, [token]);
  }

  // Hook to show user account
  const [getUserName, setUserName] = useState();
  function ShowUserAccount() {
    const { urluserName } = useParams();
    useEffect(() => {
      if (urluserName) {
        showUserForm(true);
        setUserName(urluserName);
      }
    });
  }
  const [verificationToken, setVerificationToken] = useState();
  function Verification() {
    const { verifierToken } = useParams();
    console.log(
      "🚀 ~ file: App.js:129 ~ Verification ~ verifierToken:",
      verifierToken
    );
    useEffect(() => {
      if (verifierToken) {
        setVerificationPage(true);
        setVerificationToken(verifierToken);
      }
    }, [verifierToken]);
  }

  // Event handlers //
  //Callback for google login
  const handleGoogleCallbackResponse = (response) => {
    console.log("google resp", response);
    //TODO: must save username to local storage
  };

  //Callback for facebook login
  const handleFacebookCallbackResponse = (response) => {
    console.log("response " + response);
    //Decode the JWT from the response
    //TODO: must save username to local storage
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

  return (
    <Router>
      <Routes>
        <Route
          path="/reset_password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route
          path="/my_account/:urluserName"
          element={<ShowUserAccount />}
        ></Route>
        <Route
          path="/verifyme/:verifierToken"
          element={<Verification />}
        ></Route>
      </Routes>
      <React.Fragment>
        {/*If ShowForm state for signup is true*/}
        {showForm && (
          <SignUpForm
            handleFacebookCallbackResponse={handleFacebookCallbackResponse}
            handleInstagramCallbackResponse={handleInstagramCallbackResponse}
            sent={sent}
            isSending={isSending}
            setShowForm={setShowForm}
          />
        )}

        {/*If ShowForm state for login is true*/}
        {showLoginForm && (
          <LoginForm
            handleFacebookCallbackResponse={handleFacebookCallbackResponse}
            handleInstagramCallbackResponse={handleInstagramCallbackResponse}
            setShowLoginForm={setShowLoginForm}
            showPasswordResetForm={showPasswordResetForm}
            sent={sent}
            isSending={isSending}
            showUserBlocked={showUserBlocked}
            setUserBlockedPopup={setUserBlockedPopup}
            setloggedIn={setloggedIn}
          />
        )}
        {showUserBlockedPopup && (
          <UserBlocked setUserBlockedPopup={setUserBlockedPopup} />
        )}
        {passwordResetForm && (
          <ForgotPasswordForm
            sent={sent}
            isSending={isSending}
            showPasswordResetForm={showPasswordResetForm}
          />
        )}
        {newPasswordForm && (
          <ResetPasswordForm
            sent={sent}
            isSending={isSending}
            showNewPasswordForm={showNewPasswordForm}
            resetToken={resetToken}
          />
        )}

        <div className="App">
          <header className="App-header">
            {/*Send in the setShowForm and user state as props to Navbar*/}
            <Navbar
              setShowForm={setShowForm}
              setShowLoginForm={setShowLoginForm}
              userBlocked={userBlocked}
              loggedIn={loggedIn}
              setloggedIn={setloggedIn}
            />
          </header>
          <main>
            <Home userBlocked={userBlocked} loggedIn={loggedIn} />
            {userForm && loggedIn && (
              <UserAccount
                years={years}
                pastDate={pastDate}
                loggedIn={loggedIn}
                getUserName={getUserName}
              />
            )}
            {showVerificationPage && (
              <VerificationPage
                verificationToken={verificationToken}
                setVerificationPage={setVerificationPage}
                setloggedIn={setloggedIn}
              />
            )}
          </main>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
