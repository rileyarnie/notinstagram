import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/NavigationBar.css";

class NavigationBar extends Component {
  render() {
    return (
      <ReactBootstrap.Navbar bg="" expand="lg">
        <ReactBootstrap.Navbar.Brand>
          <Link to="/">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="picha"
            />
          </Link>
        </ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootstrap.Nav className="ml-auto">
            <ReactBootstrap.Nav.Item>
              <Link to="/">
                <img
                  alt="picha"
                  src="https://img.icons8.com/material-rounded/24/000000/home.png"
                />
              </Link>
            </ReactBootstrap.Nav.Item>
            <ReactBootstrap.Nav.Item>
              <Link to={`profile/${this.props.currentUser.id}`}>

                <img
                  alt="picha"
                  src="https://img.icons8.com/android/24/000000/user.png"
                />
              </Link>
            </ReactBootstrap.Nav.Item>
            <ReactBootstrap.Nav.Item>
              <Link to="/new-post">
                <img
                  alt="picha"
                  src="https://img.icons8.com/material-outlined/24/000000/add.png"
                />
              </Link>
            </ReactBootstrap.Nav.Item>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Navbar>
    );
  }
}

export default NavigationBar;
