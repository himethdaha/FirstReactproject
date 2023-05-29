// Imports
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";
import { React, useState } from "react";

// Styles
import "../../css/Form.css";
import close from "../../logos/register/close.svg";

const ResetPasswordForm = ({
  handleInputOnPasswordReset,
  error,
  sent,
  setError,
  isSending,
  showNewPasswordForm,
  passwordResetForm,
  newPasswordData,
  connFailedMessg,
  passToken,
}) => {
  // Hooks
  const [stateStatus, setStatus] = useState("");

  // Variables
  const navigate = useNavigate();
  // New password setting form handler
  const handlePasswordResetSubmit = async function (event) {
    event.preventDefault();
    setError({});
    isSending(true);
    const dataToSend = { ...newPasswordData, token: passToken };
    console.log("Data sent", dataToSend);

    try {
      const responseData = await fetchData(
        "http://localhost:8000/reset_password",
        dataToSend,
        "PATCH"
      );
      console.log("responseData", responseData);
      if (responseData.status >= 400) {
        console.log("error");
        isSending(false);
        const newPasswordError = {
          passwordConfirm: responseData.message,
        };

        setError((prevError) => ({
          ...prevError,
          newPasswordSubmit: newPasswordError,
        }));
      } else {
        isSending(false);
        setStatus(responseData.status);
        const newPasswordError = {
          passwordConfirm: responseData.message,
        };
        setError((prevError) => ({
          ...prevError,
          newPasswordSubmit: newPasswordError,
        }));
      }
    } catch (error) {
      isSending(false);

      const message = error.message;

      if (message === connFailedMessg) {
        const newPasswordError = {
          passwordConfirm: "Connection to server failed",
        };

        setError((prevError) => ({
          ...prevError,
          newPasswordSubmit: newPasswordError,
        }));
      }
    }
  };

  // Close form event handler
  const handleCloseForm = (e) => {
    showNewPasswordForm(false);
    navigate("/");
  };
  return (
    <div className="form-container">
      <form
        className="form resetPassword-reset-form"
        onSubmit={(e) => handlePasswordResetSubmit(e)}
        method="POST"
      >
        <div className="form-header">
          <h1 className="form-header-text">create new password</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn form-signup-close-btn"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <span className="form-tns signup-tns ">
          Enter your new password here
        </span>
        <label className="form-label form-label-signup" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-input "
          id="newPassword"
          name="newPassword"
          required={true}
          onChange={handleInputOnPasswordReset}
        ></input>
        {error?.newPasswordSubmit?.password && (
          <ErrorAlert
            message={error.newPasswordSubmit.password}
            status={stateStatus}
          />
        )}
        <label
          className="form-label form-label-signup"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          className="form-input "
          id="passwordConfirm"
          name="newPasswordConfirmation"
          required={true}
          onChange={handleInputOnPasswordReset}
        ></input>
        {sent && <ErrorAlert message={"Sending Info..."} status={200} />}
        {error?.newPasswordSubmit?.passwordConfirm && (
          <ErrorAlert
            message={error.newPasswordSubmit.passwordConfirm}
            status={stateStatus}
          />
        )}
        <button
          className="form-submit-btn"
          id="newPassword-form-btn"
          type="submit"
        >
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
