const fetchData = async (url, data, method) => {
  try {
    // Send data to server
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "image/jpeg, image/jpg,image/png",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    // Returns a JWT
    const responseData = await response.json();
    console.log("responseData", responseData);
    return responseData;
  } catch (error) {
    console.log("error", error);
    let message;
    error.message === "Failed to fetch"
      ? (message = "Backend Server Error")
      : (message = error.message);

    const err = {
      status: 500,
      message,
    };

    throw err;
  }
};

export default fetchData;
