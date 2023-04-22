import "./css/App.css";
import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="Main">
        <Home />
      </main>
    </div>
  );
}

export default App;
