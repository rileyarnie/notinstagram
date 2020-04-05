import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import React from "react"

export const currentUser = () => {
  return {
    type: "GETUSER",
    name: null
  };
};

export const user = () => {
  return dispatch => (
    <Query query={MY_QUERY}>
      {({ data, error, loading }) => {
        const currentUser = data.me;
        console.log("REDUCER!! current user data", { currentUser });
        dispatch(currentUser());
      }}
    </Query>
  );
};

const MY_QUERY = gql`
  {
    me {
      username
      id
      postSet {
        id
        image
        caption
        likes {
          id
        }
      }
      likeSet {
        id
      }
    }
  }
`;
