import React, { Component } from "react";
import "./Post.css";
import Comment from "../Comment";
import { Form, Col, Button } from "react-bootstrap";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import Like from "../Like";

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
      <article className="Post" ref="Post" key={this.props.post.id}>
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img
                src={`http://localhost:8000/media/${this.props.post.postedBy.profile.pic}`}
                alt="picha"
              />
            </div>
            <div className="Post-user-nickname">
              <Link to={`/profile/${this.props.post.postedBy.id}`}>
                <span>{this.props.post.postedBy.username}</span>
              </Link>
            </div>
            <div className="delete">
              {this.props.post.postedBy.username ===
              this.props.currentUser.username ? (
                <Link to={`/delete-post/${this.props.post.id}`}>
                  <img
                    src="https://img.icons8.com/officexs/16/000000/delete-sign.png"
                    alt="delete"
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img 
             onDoubleClick={(event)=>{

              console.log("I like this")}
            }
            
            alt="Icon Living" src={`${this.props.post.image}`} />
          </div>
        </div>
        <div>
          {console.log(this.props.post.likes.length)}
          <Like postId={this.props.post.id} likeCount = {this.props.post.likes.length} />
        </div>
        <br/>
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
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      onClick={event => handleSubmit(event, createComment)}
                    >
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
