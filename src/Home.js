import "./css/Main.css";
const Home = ({ userBlocked, loggedIn }) => {
  let initialText = "";
  if (userBlocked || !loggedIn) {
    initialText = "HOME";
  } else {
    if (loggedIn) {
      console.log("home loggedin");
      // Get the name from localstorage
      const userName = localStorage.getItem("userName");
      initialText = `WELCOME ${userName.toUpperCase()}`;
    }
  }

  return (
    /* navbar header*/
    <div className="Main">
      <h1 className="title">{initialText}</h1>
    </div>
  );
};

export default Home;
