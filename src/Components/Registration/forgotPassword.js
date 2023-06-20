// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import forgotPasswordSend from "../../utils/helperFunctions/forgotPasswordSend";

// 3rd party libraries
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const ForgotPasswordForm = ({
  handleInputOnPasswordChange,
  error,
  sent,
  setError,
  isSending,
  passwordResetData,
  showPasswordResetForm,
  connFailedMessg,
}) => {
  const [stateStatus, setStatus] = useState("");
  const [resendVisible, resendHidden] = useState(false);

  const handlePasswordForgotSubmit = async (event) => {
    event.preventDefault();
    resendHidden(true);
    setError({});
    // Set loading message
    isSending(true);

    await forgotPasswordSend(
      "http://localhost:8000/forgot_password",
      passwordResetData,
      isSending
    );
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

    await forgotPasswordSend(
      "http://localhost:8000/forgot_password",
      passwordResetData,
      "POST",
      setError,
      isSending,
      setStatus,
      connFailedMessg
    );
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
          onChange={handleInputOnPasswordChange}
        ></input>
        {sent && (
          <ErrorAlert
            message={"Sending email. Might take a few minutes"}
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
