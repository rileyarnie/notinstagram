import React, { Component } from "react";
import "../styles/Post.css";
import Comment from "./Comment";
import { Form, Col, Button } from "react-bootstrap";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class Post extends Component {
  state = {
    content: "",
    postId: ""
  };

  render() {
    const handleSubmit = (event, createComment) => {
      event.preventDefault();
      createComment();
    };
    const { content, postId } = this.state;

    return (
      <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img
                src={`http://localhost:8000/media/${this.props.post.postedBy.profile.pic}`}
                alt="photo"
              />
            </div>
            <div className="Post-user-nickname">
              <span>{this.props.post.postedBy.username}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img
              alt="Icon Living"
              src={`http://localhost:8000/media/${this.props.post.image}`}
            />
          </div>
        </div>
        <div className="Post-caption">
          <strong>{this.props.post.caption}</strong>
        </div>
        <div>
          <h6>comments</h6>
          {this.props.post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Mutation
            mutation={CREATE_COMMENT}
            variables={{ content, postId }}
            onCompleted={data => {
              console.log({ data });
            }}
          >
            {(createComment, { loading, error }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Something went wrong...</div>;

              return (
                <Form.Row
                  className="mt-3"
                  onSubmit={event => handleSubmit(event, createComment)}
                >
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Post a comment"
                      value={content}
                      onChange={event =>
                        this.setState({
                          content: event.target.value,
                          postId: this.props.post.id
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button variant="primary" size="sm" type="submit" onClick={event => handleSubmit(event, createComment)}>
                      Comment
                    </Button>{" "}
                  </Form.Group>
                </Form.Row>
              );
            }}
          </Mutation>
        </div>
      </article>
    );
  }
}

export default Post;

const CREATE_COMMENT = gql`
  mutation($content: String!, $postId: Int!) {
    createComment(content: $content, postId: $postId) {
      user {
        username
      }
      post {
        id
      }
    }
  }
`;
