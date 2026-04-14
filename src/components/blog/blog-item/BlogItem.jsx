import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = (props) => {
  const { title, cover, author, _id } = props;

  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <small>{author}</small>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;