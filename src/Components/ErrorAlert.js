import React from "react";

const ErrorAlert = ({ message }) => {
  return (
    <div
      style={{
        color: "#721c24",
        backgroundColor: "#f8d7da",
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
