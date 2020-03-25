import React from "react";
import { Row, Col } from "react-bootstrap";

const Like = props => {
  return (
    <div className="like">
      <Row>
        <Col></Col>
      </Row>

      <img
        id="like"
        src="https://img.icons8.com/color/24/000000/filled-like.png"
        alt="like"
      />
      <p id="likes">
        {props.likeCount} {props.likeCount === 1 ? "like" : "likes"}
      </p>
    </div>
  );
};

export default Like;
