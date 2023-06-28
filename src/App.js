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
console.log("🚀 ~ file: App.js:34 ~ years after:", years);

function App() {
  // HOOKS //
  //hook to open/close sign up form
  const [showForm, setShowForm] = useState(false);

  // hook to open/close login form
  const [showLoginForm, setShowLoginForm] = useState(false);

  // To get the username from the url
  const [urluserName, setUrlUserName] = useState("");

  // To get the verification token from the url
  const [signUpVerificationToken, setSignUpVerificationToken] = useState("");

  // To show the user profile link
  const [loggedIn, setloggedIn] = useState(false);

  // To hide user blocked popup
  const [showUserBlockedPopup, setUserBlockedPopup] = useState(false);

  // To hide/show the password reset form
  const [passwordResetForm, showPasswordResetForm] = useState(false);

  // To hide/show password reset form
  const [newPasswordForm, showNewPasswordForm] = useState(false);

  // State to show sending forgot password email
  const [sent, isSending] = useState(false);

  // State to show a user has been blocked
  const [userBlocked, showUserBlocked] = useState(false);

  const [passToken, setPassToken] = useState("");

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

  // Function to get the token off the url
  function ResetPass() {
    const { token } = useParams();
    useEffect(() => {
      if (token) {
        setPassToken(token);
        showNewPasswordForm(true);
      }
    }, [token]);
  }

  // Function to get the username off the url
  function GetUsername() {
    const { userName } = useParams();
    useEffect(() => {
      if (userName) {
        setUrlUserName(userName);
      }
    }, [userName]);
  }

  // To get the verification token off the url
  function Verifier() {
    const { verifierToken } = useParams();
    useEffect(() => {
      if (verifierToken) {
        setSignUpVerificationToken(verifierToken);
      }
    }, [verifierToken]);
  }

  return (
    <Router>
      <Routes>
        <Route path="/reset_password/:token" element={<ResetPass />}></Route>
        <Route path="/My_Account/:userName" element={<GetUsername />}></Route>
        <Route path="/verifyme/:verifierToken" element={<Verifier />}></Route>
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
            passToken={passToken}
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
            {urluserName && loggedIn && (
              <UserAccount
                years={years}
                pastDate={pastDate}
                urluserName={urluserName}
              />
            )}
            {signUpVerificationToken && (
              <VerificationPage verifierToken={signUpVerificationToken} />
            )}
          </main>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
