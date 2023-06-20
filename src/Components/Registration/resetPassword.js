// Imports
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";
import fetchData from "../../utils/helperFunctions/returnFetchResponse";
import { React } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  newPasswordData,
  passToken,
}) => {
  // Variables
  const navigate = useNavigate();
  // New password setting form handler
  const handlePasswordResetSubmit = async function (event) {
    event.preventDefault();
    setError({});
    isSending(true);
    const dataToSend = { ...newPasswordData, token: passToken };

    try {
      const responseData = await fetchData(
        "http://localhost:8000/reset_password",
        dataToSend,
        "PATCH"
      );
      console.log("responseData", responseData);
      if (responseData.status >= 400 && responseData.status <= 500) {
        throw responseData;
      } else if (responseData.status >= 500) {
        const err = {
          status: responseData.status,
          message: "Something went wrong on our side 🥹",
        };
        throw err;
      } else {
        isSending(false);
        toast.success(`${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      isSending(false);

      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
