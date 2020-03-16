import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

class Auth extends Component {
  state = {
    newUser: false,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  };

  render() {
    return (
      <div>
        {this.state.newUser ? (
          <Register newUser={this.state.newUser}></Register>
        ) : (
          <Login></Login>
        )}
      </div>
    );
  }
}

export default Auth;
