import React from "react";
import "../../css/userBlocked.css";
import close from "../../logos/register/closePopup.svg";

const UserBlocked = ({ setUserBlockedPopup }) => {
  const style = {
    width: "3rem",
    height: "3rem",
  };

  const handleCloseForm = () => {
    setUserBlockedPopup(false);
  };
  return (
    <div className="popup-container" id="user-popup-block">
      <div className="popup-content">
        <div className="popup-header">
          <div className="popup-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="red"
              style={style}
              className="popup-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <img
            src={close}
            alt="Form close button"
            className="form-close-btn-popup"
            onClick={(e) => handleCloseForm(e)}
          ></img>
        </div>
        <div className="popup-text">
          <p>
            User {localStorage.getItem("userName")} is blocked due to
            consecutive invalid username/password attempts. Please contact{" "}
            <a href="tel:1-888-888888">1-888-888888</a> or email{" "}
            <a href="mailto:test@gmail.com">test@gmail.com</a> to re-activate
            the account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBlocked;
