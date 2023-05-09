import "./css/Main.css";
const Home = ({ user }) => {
  let initialText = "";
  Object.keys(user).length !== 0
    ? (initialText = `WELCOME ${user.name.toUpperCase()}`)
    : (initialText = `HOME`);

  return (
    /* navbar header*/
    <h1 className="title">{initialText}</h1>
  );
};

export default Home;
