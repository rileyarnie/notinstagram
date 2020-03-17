import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    const { username, password } = this.state;

    const handleSubmit = async (event, tokenAuth, client) => {
      event.preventDefault();
      const res = await tokenAuth();
      localStorage.setItem("authToken", res.data.tokenAuth.token);
      client.writeData({ data: { isLoggedIn: true } });
    };

    return (
      <Container>
        Login
        <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
          {(tokenAuth, { loading, error, called, client }) => {
            return (
              <Form onSubmit={event => handleSubmit(event, tokenAuth, client)}>
                <Form.Group controlId="">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ username: event.target.value })
                    }
                    value={username}
                    type="text"
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ password: event.target.value })
                    }
                    value={password}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group>
                    <Col>
                      <Button className="" variant="primary" type="submit"
                      disabled={
                        loading ||
                        !username.trim() ||
                        !password.trim() }
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Form.Text className="text-muted" md="">
                        Don't Have an Account? Register.
                      </Form.Text>
                    </Col>
                  </Form.Group>
                </Form.Row>
              </Form>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default Login;

const LOGIN_MUTATION = gql`
  mutation($password: String!, $username: String!) {
    tokenAuth(password: $password, username: $username) {
      token
    }
  }
`;
