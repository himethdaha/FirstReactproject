// Imports
import ErrorAlert from "../Alerts/ErrorAlert";

// 3rd party libraries
import React from "react";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const ForgotPasswordForm = ({
  handleInputOnPasswordChange,
  handlePasswordResetSubmit,
  handleCloseForm,
  error,
}) => {
  return (
    <div className="form-container">
      <form
        className="form password-reset-form"
        onSubmit={(e) => handlePasswordResetSubmit(e)}
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
        {error?.passwordResetError?.passwordResetEmail && (
          <ErrorAlert message={error.passwordResetError.passwordResetEmail} />
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
