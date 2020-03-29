import React from "react";
import "../styles/App.css";
import NavigationBar from "./navigation/NavigationBar";
import PostList from "./pages/homepage/PostList"
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Profile from "./Profile/Profile"
import NewPost from "./pages/NewPost"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DeletePost from "./pages/DeletePost";




function App() {
  return (
    <div className="App">
      <Query query={ME_QUERY}>
        {({ data, loading, error }) => {

          if (loading) return <div>Loading....</div>;
          if (error) return <div>Something went wrong....</div>;
          const currentUser = data.me;
          console.log("current user data", { currentUser });
          return (
            <Router>
                <NavigationBar />
                <Switch>
                  <Route exact path="/" render={(props)=><PostList {...props} currentUser={currentUser}/>}/>
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/delete-post/:id" component={DeletePost} />
                  <Route exact path="/new-post" component={NewPost} />
                </Switch>
            </Router>
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
