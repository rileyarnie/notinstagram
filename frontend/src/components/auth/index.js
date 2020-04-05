import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

class Auth extends Component {

  constructor(props){
    super(props)

    this.registerHandler = this.registerHandler.bind(this)
    this.state={

      newUser:true
    }

    this.loginHandler = this.loginHandler.bind(this)
    this.state={

      newUser:false
    }

    
  }

  
  registerHandler(){
    this.setState({newUser: false})
  }

  loginHandler(){
    this.setState({newUser: true})
  }

  render() {
    return (
      <div>
        {this.state.newUser ? (
          <Register newUser={this.registerHandler}></Register>
        ) : (
          <Login newUser={this.loginHandler}></Login>
        )}
      </div>
    );
  }
}

export default (Auth);