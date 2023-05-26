const fetchData = async (url, data) => {
  // Send data to server
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // Returns a JWT
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

export default fetchData;
