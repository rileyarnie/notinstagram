import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

class Profile extends Component {
  render() {

    return (
      <Query query={USER_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div> Loading..</div>;
          if (error) return <div> Something went wrong...</div>;
          console.log("Profile:",{ data });

          return <div>Profile for: {data.user.username} </div>;
        }}
      </Query>
    );
  }
}

export default Profile;

const USER_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      username
      postSet {
        image
        caption
        comments {
          content
          user {
            username
          }
        }
      }
    }
  }
`;
