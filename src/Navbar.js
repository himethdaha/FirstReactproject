import logo from "./logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* navbar header*/}
      <h1 className="navbarHeader">
        AlgoNoob <img src={logo} className="App-logo" alt="logo" />
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
    </nav>
  );
};

export default Navbar;
