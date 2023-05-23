import "./css/Main.css";
const Home = ({ user, userBlocked }) => {
  let initialText = "";
  if (userBlocked || Object.keys(user).length === 0) {
    initialText = "HOME";
  } else {
    if (Object.keys(user).length !== 0) {
      if (user.name) {
        initialText = `WELCOME ${user.name.toUpperCase()}`;
      } else if (user.userName) {
        initialText = `WELCOME ${user.userName.toUpperCase()}`;
      }
    }
  }

  return (
    /* navbar header*/
    <h1 className="title">{initialText}</h1>
  );
};

export default Home;
