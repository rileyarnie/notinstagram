import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { POSTS_QUERY } from "./homepage/PostList";

const DeletePost = (props) => {
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

  const handleUpdateCache = (cache, { data: { deletePost } }) => {
    const data = cache.readQuery({ query: POSTS_QUERY });
    const index = data.posts.findIndex(
      (post) => Number(post.id) === deletePost.postId
    );
    const posts = [
      ...data.posts.slice(0, index),
      ...data.posts.slice(index + 1),
    ];
    cache.writeQuery({ query: POSTS_QUERY, data: { posts } });
  };
  return (
    <>
      <Mutation
        mutation={DELETE_MUTATION}
        variables={{ postId: props.match.params.id }}
        update={handleUpdateCache}
      >
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
                  onClick={(event) => handleSubmit(event, deletePost)}
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
  mutation($postId: Int!) {
    deletePost(postId: $postId) {
      postId
    }
  }
`;
