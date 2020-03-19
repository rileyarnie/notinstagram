import React, { Component } from "react";
import "../styles/Post.css";
import Comment from "./Comment";
import { Form, Col, Button } from "react-bootstrap";

class Post extends Component {
  render() {
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
          <h6 >comments</h6>
          {this.props.post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Form.Row className="mt-3">
            <Form.Group as={Col}>
              <Form.Control type="text" placeholder="Post a comment" />
            </Form.Group>

            <Form.Group as={Col}>
              <Button variant="primary" size="sm">
                Comment
              </Button>{" "}
            </Form.Group>
          </Form.Row>
        </div>
      </article>
    );
  }
}

export default Post;
