import React from "react";

const ErrorAlert = ({ message }) => {
  return (
    <div
      style={{
        color: "#721c24",
        backgroundColor: "#f8d7da",
        borderColor: "#f5c6cb",
        padding: ".75rem 1.25rem",
        width: "100%",
        marginBottom: "1rem",
        borderRadius: ".25rem",
        boxSizing: " border-box",
        textAlign: "left",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
