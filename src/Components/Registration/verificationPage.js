// Imports
import fetchData from "../../utils/helperFunctions/returnFetchResponse";

// Styling
import "../../css/verifierPage.css";

// 3rd party libraries
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";

const VerificationPage = ({ verifierToken }) => {
  // Variables
  const dataToSend = { token: verifierToken };

  useEffect(() => {
    console.log("counting");
    (async () => {
      try {
        const responseData = await fetchData(
          "http://localhost:8000/verifyme",
          dataToSend,
          "POST"
        );
        console.log(
          "🚀 ~ file: verificationPage.js:124 ~ handleUserVerification ~ responseData:",
          responseData
        );
        return responseData;
      } catch (error) {
        console.error(error);
        return error;
      }
    })();
  }, []);

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
