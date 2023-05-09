import "./css/Navbar.css";
import logo from "./logos/navbar/logo.svg";
import SignUp from "./signup";
import LogIn from "./LogIn";

const Navbar = ({ setShowForm, user, setUser }) => {
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
          Search algorithms
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar sorting algorithm*/}
        <li className="navbar-ul-item">
          Sort algorithms
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar string search algorithm*/}
        <li className="navbar-ul-item">
          String manipulation algorithms
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
        {/*navbar data structures*/}
        <li className="navbar-ul-item">
          Data structures
          <span className="navbar-ul-item-dropdown">&#9662;</span>
        </li>
      </ul>
      <ul className="navbar-ul-user navbar-ul">
        <LogIn />
        <SignUp setShowForm={setShowForm} user={user} setUser={setUser} />
      </ul>
    </nav>
  );
};

export default Navbar;
