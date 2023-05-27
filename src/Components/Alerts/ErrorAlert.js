import React from "react";

const ErrorAlert = ({ message, status }) => {
  console.log("errstatus", status);
  return (
    <div
      style={{
        color: status === 200 ? "#FFFFFF" : "#721c24",
        backgroundColor: status === 200 ? "#a2d9a6" : "#f8d7da",
        borderColor: "#f5c6cb",
        padding: ".75rem 1.25rem",
        width: "60%",
        marginBottom: "1rem",
        borderRadius: ".25rem",
        boxSizing: " border-box",
        textAlign: "left",
        fontSize: "1.1rem",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
