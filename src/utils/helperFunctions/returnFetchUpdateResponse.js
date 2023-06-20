const formData = new FormData();

const fetchData = async (url, data, method) => {
  try {
    let jsonBody = {};

    for (const [key, value] of Object.entries(data)) {
      if (key !== "profilepic") {
        jsonBody[key] = value;
      }
    }
    formData.append("jsonData", JSON.stringify(jsonBody));

    // If data has profilepic in
    if (data.profilepic) {
      const file = data.profilepic;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      const fileReaderPromise = new Promise((resolve, reject) => {
        reader.onload = function (e) {
          // Get file data
          const fileData = e.target.result;
          // Append filedata
          const fileBlob = new Blob([fileData], {
            type: file.type,
          });

          formData.append("profilepic", fileBlob, file.name);
          resolve();
        };
      });

      await fileReaderPromise;
    }

    // Send data to server
    const response = await fetch(url, {
      method: method,
      credentials: "include",
      body: formData,
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
