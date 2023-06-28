// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import forgotPasswordSend from "../../utils/helperFunctions/forgotPasswordSend";
import { handleInputOnPasswordChange } from "../../utils/eventHandlers/eventHandler";
import useEnableSubmitBtn from "../../utils/customHooks/submitBtnEnable";

// 3rd party libraries
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const ForgotPasswordForm = ({ sent, isSending, showPasswordResetForm }) => {
  // States
  const [stateStatus, setStatus] = useState("");
  const [resendVisible, resendHidden] = useState(false);

  // State to see if email is provided in forgot-password
  const [validPasswordReset, validatedPasswordReset] = useState({
    email: false,
  });

  // State to save reset password form
  const [passwordResetData, setPasswordResetForm] = useState({
    passwordResetEmail: "",
  });

  //State to be triggered by errors in forms
  const [error, setError] = useState({
    signUpError: {},
    loginError: {},
    passwordResetError: {},
    newPasswordSubmit: {},
    userUpdate: {},
    status: 400,
  });

  // Hook for forgotPassword form to enable/disable submit button
  useEnableSubmitBtn(validPasswordReset, "resetPassword-form-btn");

  const handlePasswordForgotSubmit = async (event) => {
    event.preventDefault();
    setError({});
    // Set loading message
    isSending(true);

    try {
      await forgotPasswordSend(
        "http://localhost:8000/forgot_password",
        passwordResetData
      );

      isSending(false);
      resendHidden(true);
    } catch (error) {
      isSending(false);
    }
  };

  // To resend token in case user didn not receive the email
  const resendToken = async (event) => {
    event.preventDefault();
    setError((prevError) => ({
      ...prevError,
      passwordResetError: {},
    }));
    // Set loading message
    isSending(true);

    try {
      await forgotPasswordSend(
        "http://localhost:8000/forgot_password",
        passwordResetData
      );
      isSending(false);
    } catch (error) {
      isSending(false);
    }
  };
  // To close the login form
  const handleCloseForm = () => {
    showPasswordResetForm(false);
    setError((prevError) => ({
      ...prevError,
      passwordResetError: {},
    }));
  };
  return (
    <div className="form-container">
      <form
        className="form password-reset-form"
        onSubmit={(e) => handlePasswordForgotSubmit(e)}
        method="POST"
      >
        <div className="form-header">
          <h1 className="form-header-text">Reset Password</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn password-reset-close"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <span className="form-tns login-tns">
          Enter Your email to receive <br /> instructions on resetting your
          password
        </span>
        <label className="form-label form-label-signup" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="form-input password-reset-input"
          id="email"
          name="passwordResetEmail"
          placeholder="pain@gmail.com"
          required={true}
          onChange={(event) =>
            handleInputOnPasswordChange(
              event,
              validatedPasswordReset,
              validPasswordReset,
              setError,
              setPasswordResetForm,
              passwordResetData
            )
          }
        ></input>
        {sent && (
          <ErrorAlert
            message={
              "Sending email. Might take a few minutes. Feel free to close form"
            }
            status={200}
          />
        )}
        {error?.passwordResetError?.passwordResetEmail && (
          <ErrorAlert
            message={error?.passwordResetError?.passwordResetEmail}
            status={stateStatus}
          />
        )}
        {resendVisible && (
          <Link to={"/"} className="forgot-password-link" onClick={resendToken}>
            Didn't Receive the email?. Resend email
          </Link>
        )}
        <button
          className="form-submit-btn password-reset-submit"
          id="resetPassword-form-btn"
          type="submit"
        >
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
