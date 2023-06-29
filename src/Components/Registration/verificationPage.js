// Imports
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// Styling
import "../../css/verifierPage.css";

// 3rd party libraries
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerificationPage = () => {
  // Variables
  const { verifierToken } = useParams();
  console.log(
    "🚀 ~ file: verificationPage.js:16 ~ VerificationPage ~ verifierToken:",
    verifierToken
  );

  const [signUpVerificationToken, setSignUpVerificationToken] = useState();
  console.log(
    "🚀 ~ file: verificationPage.js:19 ~ VerificationPage ~ signUpVerificationToken:",
    signUpVerificationToken
  );

  // Get the verification token
  useEffect(() => {
    if (verifierToken) {
      setSignUpVerificationToken(verifierToken);
    }
  }, [verifierToken]);

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

          return responseData;
        } catch (error) {
          console.error(error);
          return error;
        }
      })();
    }
  }, [signUpVerificationToken]);

  return (
    <div className="verifier-container" id="verifier-container-id">
      <p className="verifier-text">
        Thank you for verifying your email!. Click on that moving ball to begin
        the verification process
      </p>
      {/* <div className="verifier-image" id="verifier-image-id"></div> */}
      <p className="verifier-text verifier-timer" id="verificationStatus">
        You will be taken back to our home page in time seconds
      </p>
    </div>
  );
};

export default VerificationPage;
