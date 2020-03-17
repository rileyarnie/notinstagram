import React, { Component } from "react";
import "../styles/Post.css";

class Post extends Component {
  render() {
    return (
      <article  className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img
                src="https://www.superherohype.com/assets/uploads/2019/12/Wonder-Woman-1984-Diana-featured-1280x720.jpg"
                alt="Chris"
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
      </article>
    );
  }
}

export default Post;
