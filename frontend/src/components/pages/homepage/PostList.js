import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "../../Post/Post"
import { withRouter } from "react-router";

class PostList extends Component {
  render() {
    return (
      <>
        <Query query={POSTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <div>Loading!</div>;
            if (error) return <div>Error!! Something Wrong</div>;
            if (!data) return <div>Not Found</div>;
            return (
              <div>
                {data.posts.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    currentUser={this.props.currentUser}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}
export default withRouter(PostList);

const POSTS_QUERY = gql`
{
  posts {
    id
    image
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

`;
