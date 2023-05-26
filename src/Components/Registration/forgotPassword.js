// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// 3rd party libraries
import React from "react";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const ForgotPasswordForm = ({
  handleInputOnPasswordChange,
  handleCloseForm,
  error,
  sent,
  setError,
  isSending,
  passwordResetData,
  showPasswordResetForm,
  showNewPasswordForm,
  connFailedMessg,
}) => {
  const handlePasswordForgotSubmit = async (event) => {
    event.preventDefault();
    setError({});
    // Set loading message
    isSending(true);

    try {
      const responseData = await fetchData(
        "http://localhost:8000/forgot_password",
        passwordResetData
      );

      if (responseData.status >= 400) {
        console.log("error");
        const newPassworError = {
          passwordResetEmail: responseData.message,
        };

        setError((prevError) => ({
          ...prevError,
          passwordResetError: newPassworError,
        }));
      } else {
        // Close the password reset form
        showPasswordResetForm(false);
        // Show the form to add the new user password
        showNewPasswordForm(true);
        isSending(false);
      }
    } catch (error) {
      isSending(false);

      const message = error.message;

      if (message === connFailedMessg) {
        const networkError = {
          passwordResetEmail: "Connection to server failed",
        };

        setError((prevError) => ({
          ...prevError,
          passwordResetError: networkError,
        }));
      }
    }
  };

  console.log("sent obj", sent);
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
        {sent && <ErrorAlert message={"Sending Email..."} status={200} />}
        {error?.passwordResetError?.passwordResetEmail && (
          <ErrorAlert
            message={error?.passwordResetError?.passwordResetEmail}
            status={error?.status}
          />
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
