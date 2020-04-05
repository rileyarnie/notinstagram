import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Widget } from "@uploadcare/react-widget";
import { POSTS_QUERY } from "./homepage/PostList";
class NewPost extends Component {
  state = {
    show: true,
    image: "",
    caption: "",
    postedBy: "",
  };

  render() {
    const { show, image, caption, postedBy } = this.state;
    const handleClose = () => {
      this.setState({ show: false });
      this.props.history.goBack();
    };

    const handleSubmit = (event, createPost) => {
      event.preventDefault();
      createPost();
      this.props.history.goBack();
    };

    const handleUpdateCache = (cache, { data: { createPost } }) => {
      console.log("cache response:", createPost);
      const data = cache.readQuery({ query: POSTS_QUERY });
      console.log("cache data new post:", data);
      const posts = data.posts.concat(createPost.post);
      console.log("cache data update new post:", posts);
      cache.writeQuery({ query: POSTS_QUERY, data: { posts } });
    };

    return (
      <Mutation
        mutation={NEW_POST}
        variables={{ image, caption, postedBy }}
        onCompleted={(data) => {
          console.log("created post", { data });
        }}
        update={handleUpdateCache}
      >
        {(createPost, { error, loading }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Something went wrong...</div>;

          return (
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <label htmlFor="file"></label>{" "}
                    <Widget
                      publicKey="a24cc6ae9877bb2e3c14"
                      id="file"
                      onChange={(file) => {
                        this.setState({ image: file.cdnUrl });

                        console.log(file);
                      }}
                    />
                  </p>
                  <Form
                    onSubmit={(event) => {
                      handleSubmit(event, createPost);
                      this.props.history.goBack();
                    }}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="text"
                        placeholder="Say Something"
                        onChange={(event) =>
                          this.setState({ caption: event.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(event) => {
                      handleSubmit(event, createPost);
                    }}
                  >
                    Post
                  </Button>
                </Modal.Footer>
              </Modal>
              {console.log(this.state)}
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(NewPost);

const NEW_POST = gql`
  mutation($caption: String, $image: String!, $postedBy: String) {
    createPost(caption: $caption, image: $image, postedBy: $postedBy) {
      post {
        image
        id
        caption
        postedBy {
          id
          username
          profile {
            pic
          }
        }
        comments {
          id
          content
          user {
            username
            id
          }
          datePosted
        }
        likes {
          id
        }
      }
    }
  }
`;
