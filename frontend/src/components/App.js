import React from "react";
import "../styles/App.css";
import NavigationBar from "./navigation/NavigationBar";
import PostList from "./PostList";
import { Container } from "react-bootstrap";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export const UserContenxt = React.createContext();

function App() {
  return (
    <div className="App">
      <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
          console.log("haha ooy", { data });

          if (loading) return <div>Loading....</div>;
          if (error) return <div>Something went wrong....</div>;
          const currentUser = data.me
          console.log("current user data",{currentUser})
          return (
            <>
              <NavigationBar currentUser={currentUser} />
              <Container>
                <PostList />
              </Container>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export default App;

const ME_QUERY = gql`
  {
    me {
      username
      id
    }
  }
`;
