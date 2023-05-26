// Imports
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

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
  setShowLoginForm,
  newPasswordData,
  connFailedMessg,
}) => {
  // New password setting form handler
  const handlePasswordResetSubmit = async function (event) {
    event.preventDefault();
    setError({});
    isSending(true);
    console.log("Data sent", newPasswordData);

    try {
      const responseData = await fetchData(
        "http://localhost:8000/reset_password",
        newPasswordData
      );

      if (responseData.status >= 400) {
        console.log("error");
        const newPasswordError = {
          password: responseData.message,
        };

        setError((prevError) => ({
          ...prevError,
          newPasswordSubmit: newPasswordError,
        }));
      } else {
        // Close the new password form
        showNewPasswordForm(false);
        // open the login form
        setShowLoginForm(true);
        isSending(false);
      }
    } catch (error) {
      isSending(false);

      const message = error.message;

      if (message === connFailedMessg) {
        const newPasswordError = {
          password: "Connection to server failed",
        };

        setError((prevError) => ({
          ...prevError,
          newPasswordSubmit: newPasswordError,
        }));
      }
    }
  };

  // Close form event handler
  const handleCloseForm = () => {
    showNewPasswordForm(false);
  };
  return (
    <div className="form-container">
      <form
        className="form resetPassword-reset-form"
        onSubmit={(e) => handlePasswordResetSubmit(e)}
        method="POST"
      >
        <div className="form-header">
          <h1 className="form-header-text">create an account</h1>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn form-signup-close-btn"
            onClick={(e) => handleCloseForm()}
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
          <ErrorAlert message={error.newPasswordSubmit.password} />
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
          <ErrorAlert message={error.newPasswordSubmit.passwordConfirm} />
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
