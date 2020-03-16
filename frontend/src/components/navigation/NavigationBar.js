import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
class NavigationBar extends Component {
  render() {
    return (
      <ReactBootstrap.Navbar bg="" expand="lg">
        <ReactBootstrap.Navbar.Brand href="#home">
          NotInsta
        </ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootstrap.Nav className="mr-auto">
            <ReactBootstrap.Nav.Link href="/">Home</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/login">
              Login
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/logout">
              Logout
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
          <ReactBootstrap.Form inline>
            <ReactBootstrap.FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <ReactBootstrap.Button variant="outline-success">
              Search
            </ReactBootstrap.Button>
          </ReactBootstrap.Form>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Navbar>
    );
  }
}

export default NavigationBar;
