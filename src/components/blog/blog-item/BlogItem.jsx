import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = ({ title, cover, author, _id, category }) => {
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body className="blog-card-body">
          <span className="blog-category-badge">{category}</span>
          <Card.Title className="blog-card-title">{title}</Card.Title>
          <small className="blog-card-author">{author}</small>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BlogItem;