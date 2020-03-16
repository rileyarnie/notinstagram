import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

class PostList extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data, error, loading }) => {
          console.log("*****", { data });
          if (loading) return <div>Loading!</div>;
          if (error) return <div>Error!! Something Wrong</div>;
          return <div>{data.me.username}</div>;
        }}
      </Query>
    );
  }
}
export default PostList;

const ME_QUERY = gql`
  {
    me {
      username
    }
  }
`;
