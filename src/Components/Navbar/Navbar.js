// Imports
import logo from "../../logos/navbar/logo.svg";
import SignUp from "./signupNavbar";
import LogIn from "./LogInNavbar";

// 3rd party libraries
import { Link, NavLink } from "react-router-dom";

// styles
import "../../css/Navbar.css";

const Navbar = ({
  setShowForm,
  setShowLoginForm,
  user,
  setUser,
  setHideSignUpButton,
  setHideLoginButton,
  signUpHidden,
  loginHidden,
  profile,
  showProfile,
}) => {
  // Get the username if user exists
  let userName = "";
  if (Object.keys(user).length > 0) {
    userName = user.userName || userName.name;
  }
  //Get the setShowForm prop to be sent to the signUp function
  return (
    <nav className="navbar">
      {/* navbar header*/}
      <h1 className="navbarHeader">
        AlgoNoob
        <span>
          <img src={logo} className="Nav-logo" alt="logo" />
        </span>
      </h1>
      <ul className="navbar-ul">
        {/*navbar searching algorithm */}
        <li className="navbar-ul-item">
          <NavLink to={"/SearchAlgorithms"} className="navLink">
            Search algorithms
          </NavLink>
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar sorting algorithm*/}
        <li className="navbar-ul-item">
          <NavLink to={"/SortAlgorithms"} className="navLink">
            Sort algorithms
          </NavLink>
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar string search algorithm*/}
        <li className="navbar-ul-item">
          <NavLink to={"/StringAlgorithms"} className="navLink">
            String manipulation algorithms
          </NavLink>
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar data structures*/}
        <li className="navbar-ul-item">
          <NavLink to={"/DataStructures"} className="navLink">
            Data structures
          </NavLink>
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
      </ul>
      <ul className="navbar-ul-user navbar-ul" id="navbar-ul-user-registry">
        {profile && (
          <NavLink to={`/My_Account/${userName}`} className="navLink">
            My Account
          </NavLink>
        )}
        {!loginHidden && (
          <LogIn
            setShowLoginForm={setShowLoginForm}
            user={user}
            setUser={setUser}
            setHideSignUpButton={setHideSignUpButton}
            showProfile={showProfile}
          />
        )}
        {!signUpHidden && (
          <SignUp
            setShowForm={setShowForm}
            user={user}
            setUser={setUser}
            setHideLoginButton={setHideLoginButton}
            showProfile={showProfile}
          />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
