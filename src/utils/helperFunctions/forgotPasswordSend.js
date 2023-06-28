import fetchData from "./returnFetchResponse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const forgotPasswordSend = async (url, data) => {
  try {
    const responseData = await fetchData(url, data, "POST");
    if (responseData.status >= 400 && responseData.status <= 500) {
      throw responseData;
    } else if (responseData.status >= 500) {
      const err = {
        status: responseData.status,
        message: "Something went wrong on our side 🥹",
      };
      throw err;
    } else {
      // Set status of success message to be shown becuase the user needs to know email is sent
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
    throw error;
  }
};

export default forgotPasswordSend;
