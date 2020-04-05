import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Container } from "react-bootstrap";
import "./Profile.css";

class Profile extends Component {
  state = {
    profilepic: "http://localhost:8000/media/default.jpg"
  };

  render() {
    return (
      <Query query={USER_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div> Loading..</div>;
          if (error) return <div> Something went wrong...</div>;
          console.log("Profile:", { data });

          return (
            <>
              <Container className="cont">
                <div className="profile">
                  <div className="profile-image">
                    <img src={this.state.profilepic} alt="" />
                  </div>
                  <div className="profile-user-settings">
                    <h1 className="profile-user-name">{data.user.username}</h1>

                    <button className="btn profile-edit-btn">
                      Edit Profile
                    </button>
                  </div>
                  <div className="profile-stats">
                    <ul>
                      <li>
                        <span className="profile-stat-count">
                          {`${data.user.postSet.length}
                      posts`}
                        </span>{" "}
                      </li>
                      <li>
                        <span className="profile-stat-count">
                          188 followers
                        </span>{" "}
                      </li>
                      <li>
                        <span className="profile-stat-count">
                          206 following
                        </span>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <p>1</p>
              </Container>
            </>
          );
        }}
      </Query>
    );
  }
}

export default Profile;

const USER_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      profile {
        pic
      }
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
