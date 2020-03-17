import React from "react";
import "../styles/App.css";
import Navbar from "./navigation/NavigationBar";
import PostList from "./PostList";
import { Container } from "react-bootstrap";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
      <PostList/>

      </Container>
  
    </div>
  );
}

export default App;
