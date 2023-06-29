// Imports
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// Styling
import "../../css/verifierPage.css";

// 3rd party libraries
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const VerificationPage = ({ verificationToken }) => {
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
            // Set logged in state
            toast.success(`${responseData.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
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
      <p className="verifier-text">
        Thank you for verifying your email!. We're currently verifying you.
        Please wait a moment
      </p>
      {/* <div className="verifier-image" id="verifier-image-id"></div> */}
      <p className="verifier-text verifier-timer" id="verificationStatus">
        You will be taken back to our home page in time seconds
      </p>
    </div>
  );
};

export default VerificationPage;
