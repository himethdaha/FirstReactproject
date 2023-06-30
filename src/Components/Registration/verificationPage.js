// Imports
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// Styling
import "../../css/verifierPage.css";

// 3rd party libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerificationPage = ({
  verificationToken,
  setVerificationPage,
  setloggedIn,
}) => {
  // Variables
  const navigate = useNavigate();
  let count = 4;

  // State to capture the verification token
  const [signUpVerificationToken, setSignUpVerificationToken] = useState();

  // Get the verification token
  useEffect(() => {
    if (verificationToken) {
      setSignUpVerificationToken(verificationToken);
    }
  }, [verificationToken]);

  // Call backend
  useEffect(() => {
    if (signUpVerificationToken) {
      (async () => {
        try {
          const responseData = await fetchData(
            "http://localhost:8000/verifyme",
            { token: signUpVerificationToken },
            "POST"
          );
          if (responseData.status >= 400 && responseData.status <= 500) {
            throw responseData;
          } else if (responseData.status >= 500) {
            const err = {
              status: responseData.status,
              message: "Something went wrong on our side 🥹",
            };
            throw err;
          }
          // once validated
          else {
            // Change text to show user verified
            const textToChange = document.getElementById("verifier-text-id");
            const showTimer = document.getElementById("verificationStatus");
            showTimer.style.visibility = "visible";
            textToChange.textContent = "Verified Successfully";
            textToChange.style.color = "#61dafb";

            // Show timer
            const timer = document.getElementById("verification-timer");
            const timerId = setInterval(() => {
              if (count === 0) {
                clearInterval(timerId);

                // Set username and default image
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("userName", responseData.userName);
                localStorage.setItem("encodedImage", responseData.image);

                // Send user to home page
                setloggedIn(true);
                setVerificationPage(false);
                navigate("/");
                return;
              }
              timer.textContent = count;
              --count;
            }, 1000);
          }

          return responseData;
        } catch (error) {
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
      })();
    }
  }, [signUpVerificationToken]);

  return (
    <div className="verifier-container" id="verifier-container-id">
      <p className="verifier-text" id="verifier-text-id">
        Thank you for verifying your email!. We're currently verifying you.
        Please wait a moment
      </p>
      {/* <div className="verifier-image" id="verifier-image-id"></div> */}
      <p className="verifier-text verifier-timer" id="verificationStatus">
        You will be taken back to our home page in{" "}
        <span id="verification-timer">5</span> seconds
      </p>
    </div>
  );
};

export default VerificationPage;
