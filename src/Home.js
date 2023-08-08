// Styles
import "./css/Main.css";

// 3rd party libraries
import React from "react";

const Home = ({ userBlocked, loggedIn }) => {
  let initialText = "";
  if (userBlocked || !loggedIn) {
    initialText = "HOME";
  } else {
    if (loggedIn) {
      // Get the name from localstorage
      const userName = localStorage.getItem("userName");
      initialText = `WELCOME ${userName.toUpperCase()}`;
    }
  }

  return (
    <React.Fragment>
      {/* navbar header*/}
      <div className="Main">
        <h1 className="title">{initialText}</h1>
      </div>
      <div className="Main-body">
        <h1 className="body-title">introduction</h1>
        <div className="body-content">
          <h5 className="body-secondary-title">What are Algorithms?</h5>
          <ul className="content-points algorithm-points">
            <li className="content-points-items">
              Algorithms are basically a sequence of steps we perform to get a
              desired result. Alogrithms aren't restricted to programming. Even
              in our day-to-day lives we live by performing algorithms.
            </li>
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
          </ul>
          <h5 className="body-secondary-title">What are Data Structures?</h5>
          <ul className="content-points ds-points">
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
            <li className="content-points-items">
              For example, take a simple task such as making ur breakfast.
              There's a series of steps involved to get the ultimate result
              which is the meal u consume. Algorithms can vary from something as
              simple as preparing ur breakfast to building complex softwares
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
