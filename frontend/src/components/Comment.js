import React, { Component } from "react";
import { Link } from "react-router-dom";

class Comment extends Component {



  render() {
    return (
      <div>
        {this.props.comment.content} by <Link to={`/profile/${this.props.comment.user.id}`} >{this.props.comment.user.username}</ Link>
      </div>
    );
  }
}

export default Comment;
