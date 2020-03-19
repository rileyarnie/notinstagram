import React, { Component } from "react";

class Comment extends Component {



  render() {
    return (
      <div>
        {this.props.comment.content} by <a>{this.props.comment.user.username}</a>
        
      </div>
    );
  }
}

export default Comment;
