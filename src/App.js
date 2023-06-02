// Imports
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home";
import SignUpForm from "./Components/Registration/SignupForm";
import LoginForm from "./Components/Registration/LoginForm";
import UserAccount from "./Components/User/UserAccount";
import ForgotPasswordForm from "./Components/Registration/forgotPassword";
import ResetPasswordForm from "./Components/Registration/resetPassword";
import UserBlocked from "./Components/Alerts/UserBlocked";
import useEnableSubmitBtn from "./utils/customHooks/submitBtnEnable";

// Styles
import "./css/App.css";

// 3rd party libraries
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

// Env variables
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;

const curr = new Date();
const pastMS = new Date().setFullYear(curr.getFullYear() - 70);
const pastDate = new Date(pastMS);

const years = [];
const current = new Date();
for (let year = pastDate.getFullYear(); year <= current.getFullYear(); year++) {
  years.push(year.toString());
}

function App() {
  // Constants
  const connFailedMessg = "Failed to fetch";
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

  // To get the username from the url
  const [urluserName, setUrlUserName] = useState("");

  // To show the user profile link
  const [profile, showProfile] = useState(false);

  // To hide user blocked popup
  const [showUserBlockedPopup, setUserBlockedPopup] = useState(false);

  // To hide/show the password reset form
  const [passwordResetForm, showPasswordResetForm] = useState(false);

  // To hide/show password reset form
  const [newPasswordForm, showNewPasswordForm] = useState(false);

  // To store all countries
  const [countries, setCountries] = useState([]);

  // To store all provinces
  const [states, setStates] = useState([]);

  // To store current country
  const [currCountry, setCurrCountry] = useState([]);

  // To store all cities in a province
  const [cities, setCities] = useState([]);

  // To store date of calander
  const [startDate, setDate] = useState(new Date(pastDate));

  //State to check if a user is logged in
  const [user, setUser] = useState({});

  //State to be triggered by errors in forms
  const [error, setError] = useState({
    signUpError: {},
    loginError: {},
    passwordResetError: {},
    newPasswordSubmit: {},
    userUpdate: {},
    status: 400,
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

  // State to save user update info
  const [userUpdatedInfo, updateUserInfo] = useState({
    email: "",
    username: "",
    dob: "",
    proficiency: "Default",
    country: "Default",
    province: "Default",
    city: "Default",
    address: "",
  });

  // State to show sending forgot password email
  const [sent, isSending] = useState(false);

  // State to save the new password reset form
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
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

  // State to validate the new password form
  const [validatedNewPassword, validateNewPassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  // State to validate user update info
  const [validatedUserUpdateInfo, validateUserUpdateInfo] = useState({
    email: false,
    username: false,
    dateOfBirth: false,
    Proficiency: false,
    Country: false,
    Province: false,
    City: false,
    Address: false,
    ProfilePic: false,
  });

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

  useEffect(() => {
    fetch("http://api.geonames.org/countryInfoJSON?username=himeth")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const mappedCountries = responseData.geonames.map((country) => {
          return {
            countryName: country.countryName,
            countryId: country.geonameId,
            countryCode: country.countryCode,
          };
        });
        setCountries([...mappedCountries]);
      });
  }, []);

  // Hook for signup form to enable/disable submit button
  useEnableSubmitBtn(validData, "submit-btn-signup");

  // Hook for login form to enable/disable submit button
  useEnableSubmitBtn(validLoginData, "submit-btn-login");

  // Hook for forgotPassword form to enable/disable submit button
  useEnableSubmitBtn(validPasswordReset, "resetPassword-form-btn");

  // Hook for newPassword form to enable/disable submit button
  useEnableSubmitBtn(validatedNewPassword, "newPassword-form-btn");

  // Hook for userUpate form to enable/disable submit button
  useEnableSubmitBtn(validatedUserUpdateInfo, "accounts-btn-submit");

  // Event handlers //
  //Callback for google login
  const handleGoogleCallbackResponse = (response) => {
    console.log("google resp", response);
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
        validateData({ ...validData, email: false });
        errors.email = "Email address is required";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
        )
      ) {
        validateData({ ...validData, email: false });
        errors.email = "Email is invalid";
      } else {
        validateData({ ...validData, email: true });
      }
    }
    // Validate the username
    else if (eventName === "username") {
      if (eventValue.length === 0) {
        validateData({ ...validData, username: false });
        errors.username = "Username is required";
      } else if (eventValue.length > 10) {
        validateData({ ...validData, username: false });
        errors.username = "Username can't be longer than 10 characters";
      } else {
        validateData({ ...validData, username: true });
      }
    }
    // Validate the password
    else if (eventName === "password") {
      if (eventValue.length === 0) {
        validateData({ ...validData, password: false });
        errors.password = "Password is required";
      } else if (
        !eventValue.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
        )
      ) {
        validateData({ ...validData, password: false });
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

    // // Validate the username
    if (eventName === "login-username") {
      if (eventValue.length === 0) {
        errors.username = "Username is required";
        validateLoginData({ ...validLoginData, username: false });
      } else if (eventValue.length > 10) {
        errors.username = "Username can't be longer than 10 characters";
        validateLoginData({
          ...validLoginData,
          username: false,
        });
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
        validateLoginData({ ...validLoginData, password: false });
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
  // Forgot form validation
  const handleInputOnPasswordChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    let errors = {};

    if (eventName === "passwordResetEmail") {
      if (eventValue.length === 0) {
        validatedPasswordReset({ ...validPasswordReset, email: false });
        errors.passwordResetEmail = "Email address is required";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
        )
      ) {
        validatedPasswordReset({
          ...validPasswordReset,
          email: false,
        });

        errors.passwordResetEmail = "Email is invalid";
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

  // Handle password reset validation form
  const handleInputOnPasswordReset = function (event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    console.log(eventName, eventValue);
    let passwd;
    let currPasswd;

    let errors = {};

    // Validate the password
    if (eventName === "newPassword") {
      if (eventValue.length === 0) {
        validateNewPassword({
          ...validatedNewPassword,
          password: false,
        });
        errors.password = "Password is required";
      }
      if (
        !eventValue.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
        )
      ) {
        validateNewPassword({
          ...validatedNewPassword,
          password: false,
        });
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 6 characters";
      } else {
        validateNewPassword({ ...validatedNewPassword, password: true });
      }
      console.log("password err", errors);
    }
    // Validate the confirm password
    else if (eventName === "newPasswordConfirmation") {
      if (!("password" in errors)) {
        passwd = document.getElementById("newPassword");
        currPasswd = passwd.value;
      }

      if (eventValue.length === 0) {
        errors.passwordConfirm = "Confirm Password is required";
        validateNewPassword({
          ...validatedNewPassword,
          passwordConfirmation: false,
        });
      } else if (eventValue !== currPasswd) {
        errors.passwordConfirm = "Confirm Password invalid";
        validateNewPassword({
          ...validatedNewPassword,
          passwordConfirmation: false,
        });
      } else {
        validateNewPassword({
          ...validatedNewPassword,
          passwordConfirmation: true,
        });
      }
    }
    // Set error state
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setError((prevError) => ({
        ...prevError,
        newPasswordSubmit: errors,
      }));
    } else {
      // Save form data
      setNewPasswordData({ ...newPasswordData, [eventName]: eventValue });
      console.log("after setting new password", newPasswordData);
      // Empty the errors
      setError((prevError) => ({
        ...prevError,
        newPasswordSubmit: {},
      }));
    }
  };

  // Handle input on user info update
  const handleUserInfoUpdate = async function (event) {
    // For dob input
    if (event instanceof Date) {
      // Update date status
      setDate(new Date(event));
      const date = event.getDate();
      const month = event.getMonth;
      const year = event.getFullYear();

      const dobString = `${year}-${month}-${date}`;

      validateUserUpdateInfo({
        ...validatedUserUpdateInfo,
        dateOfBirth: true,
      });

      updateUserInfo({ ...validatedUserUpdateInfo, dob: dobString });
    } else {
      let eventName = event.target.name;
      let eventValue = event.target.value;

      let errors = {};

      if (eventName === "email") {
        if (eventValue.length === 0) {
          validateUserUpdateInfo({ ...validatedUserUpdateInfo, email: false });
          errors.email = "Email address is required";
        } else if (
          !eventValue.match(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
          )
        ) {
          validateUserUpdateInfo({ ...validatedUserUpdateInfo, email: false });
          errors.email = "Email is invalid";
        } else {
          validateUserUpdateInfo({ ...validatedUserUpdateInfo, email: true });
        }
      }
      // Validate the username
      else if (eventName === "username") {
        if (eventValue.length === 0) {
          validateUserUpdateInfo({
            ...validatedUserUpdateInfo,
            username: false,
          });
          errors.username = "Username is required";
        } else if (eventValue.length > 10) {
          validateUserUpdateInfo({
            ...validatedUserUpdateInfo,
            username: false,
          });
          errors.username = "Username can't be longer than 10 characters";
        } else {
          validateUserUpdateInfo({
            ...validatedUserUpdateInfo,
            username: true,
          });
        }
      }
      // Check for proficieny selected
      else if (eventName === "proficiency") {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          Proficiency: true,
        });
      }
      // Check if country is selected
      else if (eventName === "country") {
        // Get the countryId for country name
        const countryObj = countries.filter((country) => {
          return country.countryName === eventValue;
        });

        // Set the choosen country Obj
        setCurrCountry([...countryObj]);

        // Update country state
        validateUserUpdateInfo({ ...validatedUserUpdateInfo, Country: true });

        // Call the api
        const response = await fetch(
          `http://api.geonames.org/childrenJSON?geonameId=${countryObj[0].countryId}&username=himeth`
        );

        const responseData = await response.json();
        // Get the states
        const allStates = responseData.geonames.map((state) => {
          return {
            provinceName: state.toponymName,
            adminCode: state.adminCode1,
          };
        });
        // Update the states
        setStates([...allStates]);
      }
      // Check if province is selected
      else if (eventName === "province") {
        const adminCode = states.filter((prov) => {
          return prov.provinceName === eventValue;
        });

        const response = await fetch(
          `http://api.geonames.org/searchJSON?country=${currCountry[0].countryCode}&adminCode1=${adminCode[0].adminCode}&username=himeth`
        );

        const responseData = await response.json();

        // Update country state
        validateUserUpdateInfo({ ...validatedUserUpdateInfo, Province: true });

        // Get all cities
        const allCities = responseData.geonames.map((city) => {
          return city.toponymName;
        });

        // Set all cities for the specific province
        setCities([...allCities]);
      }
      // Check if city is selected
      else if (eventName === "city") {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          City: true,
        });
      }

      // Set error state
      if (Object.keys(errors).length > 0) {
        console.log("errors", errors);
        setError((prevError) => ({
          ...prevError,
          userUpdate: errors,
        }));
      } else {
        // Save form data
        updateUserInfo({ ...userUpdatedInfo, [eventName]: eventValue });
        // Empty the errors
        setError((prevError) => ({
          ...prevError,
          userUpdate: {},
        }));
      }
    }
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

  return (
    <Router>
      <Routes>
        <Route path="/reset_password/:token" element={<ResetPass />}></Route>
        <Route path="/My_Account/:userName" element={<GetUsername />}></Route>
      </Routes>
      <React.Fragment>
        {/*If ShowForm state for signup is true*/}
        {showForm && (
          <SignUpForm
            handleFacebookCallbackResponse={handleFacebookCallbackResponse}
            handleInstagramCallbackResponse={handleInstagramCallbackResponse}
            handleInputOnChange={handleInputOnChange}
            error={error}
            sent={sent}
            setError={setError}
            isSending={isSending}
            setUser={setUser}
            setShowForm={setShowForm}
            data={data}
            connFailedMessg={connFailedMessg}
          />
        )}

        {/*If ShowForm state for login is true*/}
        {showLoginForm && (
          <LoginForm
            handleFacebookCallbackResponse={handleFacebookCallbackResponse}
            handleInstagramCallbackResponse={handleInstagramCallbackResponse}
            handleInputOnLoginChange={handleInputOnLoginChange}
            setShowLoginForm={setShowLoginForm}
            showPasswordResetForm={showPasswordResetForm}
            error={error}
            sent={sent}
            setError={setError}
            isSending={isSending}
            setUser={setUser}
            showUserBlocked={showUserBlocked}
            setUserBlockedPopup={setUserBlockedPopup}
            connFailedMessg={connFailedMessg}
            loginData={loginData}
            showProfile={showProfile}
          />
        )}
        {showUserBlockedPopup && (
          <UserBlocked user={user} setUserBlockedPopup={setUserBlockedPopup} />
        )}
        {passwordResetForm && (
          <ForgotPasswordForm
            handleInputOnPasswordChange={handleInputOnPasswordChange}
            error={error}
            sent={sent}
            setError={setError}
            isSending={isSending}
            setUser={setUser}
            passwordResetData={passwordResetData}
            showPasswordResetForm={showPasswordResetForm}
            passwordResetForm={passwordResetForm}
            connFailedMessg={connFailedMessg}
          />
        )}
        {newPasswordForm && (
          <ResetPasswordForm
            handleInputOnPasswordReset={handleInputOnPasswordReset}
            error={error}
            sent={sent}
            setError={setError}
            isSending={isSending}
            showNewPasswordForm={showNewPasswordForm}
            setShowLoginForm={setShowLoginForm}
            newPasswordData={newPasswordData}
            connFailedMessg={connFailedMessg}
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
              user={user}
              setUser={setUser}
              setHideSignUpButton={setHideSignUpButton}
              setHideLoginButton={setHideLoginButton}
              signUpHidden={signUpHidden}
              loginHidden={loginHidden}
              profile={profile}
              showProfile={showProfile}
            />
          </header>
          <main>
            <Home user={user} userBlocked={userBlocked} />
            {urluserName && (
              <UserAccount
                handleUserInfoUpdate={handleUserInfoUpdate}
                userUpdatedInfo={userUpdatedInfo}
                startDate={startDate}
                years={years}
                countries={countries}
                currCountry={currCountry}
                states={states}
                cities={cities}
                setCities={setCities}
                urluserName={urluserName}
                error={error}
              />
            )}
          </main>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
