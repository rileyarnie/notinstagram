import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class Like extends Component {
  constructor(props) {
    super(props);
    console.log("constructorr", props.likeCount);
   
    this.state = { likeCount: props.likeCount };

  
  }

  onLiked = () => {
    this.setState({likeCount: this.state.likeCount+1})
  };


  componentDidMount() {
    console.log("component did mount");
  }

  componentDidUpdate(){
    console.log("component did update")
  }


  render() {


    return (
      <Mutation
        mutation={CREATE_LIKE}
        variables={{ postId: this.props.postId }}
      >
        {CreateLike => {
               return (
            <div className="like">
              <img
                onClick={event => {
                  event.preventDefault();
                  CreateLike();
                  this.onLiked()
                }}
                id="like"
                src="https://img.icons8.com/color/24/000000/filled-like.png"
                alt="like"
              />
              <p id="likes">
                {this.state.likeCount}{" "}
                {this.state.likeCount === 1 ? "like" : "likes"}
              </p>
            </div>
          );
        }}
      </Mutation>
    );
  }

  componentDidUpdate(prevProps, prevState,snapshot) {
    console.log("component did update");
  }
}

export default Like;

const CREATE_LIKE = gql`
  mutation($postId: Int!) {
    createLike(postId: $postId) {
      post {
        id
      }
    }
  }
`;
