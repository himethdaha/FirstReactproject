import fetchData from "./returnFetchResponse";

const forgotPasswordSend = async (
  url,
  data,
  method,
  setError,
  isSending,
  setStatus,
  connFailedMessg
) => {
  try {
    const responseData = await fetchData(url, data, "POST");
    console.log("helper", url);
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
      isSending(false);
      // Set status of success message to be shown becuase the user needs to know email is sent
      setStatus(responseData.status);
      const newPassworError = {
        passwordResetEmail: responseData.message,
      };
      setError((prevError) => ({
        ...prevError,
        passwordResetError: newPassworError,
      }));
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

export default forgotPasswordSend;
