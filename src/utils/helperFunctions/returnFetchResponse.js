const fetchData = async (url, data, method) => {
  // Send data to server
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // Returns a JWT
  const responseData = await response.json();
  console.log("responseData", responseData);
  return responseData;
};

export default fetchData;
