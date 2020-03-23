import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const DeletePost = props => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.history.goBack();
  };
  const handleSubmit = (event, deletePost) => {
    event.preventDefault();
    deletePost();
    props.history.push("/");
  };

  return (
    <>
      <Mutation mutation={DELETE_MUTATION} variables={{postId:props.match.params.id}}>
        {(deletePost, { error, loading }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Something went wrong...</div>;

          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this post?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={event => handleSubmit(event, deletePost)}
                >
                  Delete Post
                  {console.log(props.match.params.id)}
                </Button>
              </Modal.Footer>
            </Modal>
          );
        }}
      </Mutation>
    </>
  );
};

export default withRouter(DeletePost);

const DELETE_MUTATION = gql`
mutation($postId:Int!){
    deletePost(postId:$postId){
  postId
    }
  }
`;
