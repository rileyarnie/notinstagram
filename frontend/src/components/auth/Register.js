import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  };
  render() {
    const { firstName, lastName, username, email, password } = this.state;

    const handleSubmit = (event, createUser) => {
      event.preventDefault();
      createUser();
    };
    return (
      <Container>
        Register
        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ firstName, lastName, username, email, password }}
          onCompleted={this.props.newUser}
        >
          {(createUser, { loading, error }) => {
            return (
              <Form onSubmit={event => handleSubmit(event, createUser)}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ firstName: event.target.value })
                    }
                    value={firstName}
                    type=""
                    placeholder="First Name"
                  />
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ lastName: event.target.value })
                    }
                    value={lastName}
                    type=""
                    placeholder="Last Name"
                  />
                </Form.Group>

                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ username: event.target.value })
                    }
                    value={username}
                    type=""
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={event =>
                      this.setState({ email: event.target.value })
                    }
                    value={email}
                    type="email"
                    placeholder="Enter email"
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
                      <Button
                        className=""
                        variant="primary"
                        type="submit"
                        disabled={
                          loading ||
                          !username.trim() ||
                          !email.trim() ||
                          !password.trim() ||
                          !firstName.trim() ||
                          !lastName.trim()
                        }
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Form.Text className="text-muted" md="">
                        Already Have an Account? Sign In.
                      </Form.Text>
                    </Col>
                  </Form.Group>
                </Form.Row>
                {error && <div>Error!!</div>}
              </Form>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default Register;

const REGISTER_MUTATION = gql`
  mutation SignupMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      user {
        username
        email
      }
    }
  }
`;
