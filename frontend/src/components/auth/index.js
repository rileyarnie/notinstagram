import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

class Auth extends Component {

  constructor(props){
    super(props)

    this.newUserHandler = this.newUserHandler.bind(this)
    this.state={

      newUser:true
    }
  }

  newUserHandler(){
    this.setState({newUser: false})
  }


  render() {
    return (
      <div>
        {this.state.newUser ? (
          <Register newUser={this.newUserHandler}></Register>
        ) : (
          <Login newUser={this.state.newUser}></Login>
        )}
      </div>
    );
  }
}

export default (Auth);
