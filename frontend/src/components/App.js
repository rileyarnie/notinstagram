import React from "react";
import "../styles/App.css";
import Auth from "./auth/Auth";
import Navbar from "./navigation/NavigationBar";
import PostList from "./PostList";


function App() {
  return (
    <div className="App">
      <Navbar />
      <PostList/>
  
    </div>
  );
}

export default App;
