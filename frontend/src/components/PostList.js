import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "./Post";

class PostList extends Component {
  render() {
    return (
      <>
        <Query query={POSTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <div>Loading!</div>;
            if (error) return <div>Error!! Something Wrong</div>;
            if (!data) return <div>Not Found</div>;
            console.log(data);
            console.log(data.posts);

            return (
              <div>
                {data.posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}
export default PostList;

const POSTS_QUERY = gql`
  {
    posts {
      id
      image
      caption
      postedBy {
        username
      }
    }
  }
`;
