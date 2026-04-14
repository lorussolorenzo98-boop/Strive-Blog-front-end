import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/blogPosts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.blogPosts)) {
          setPosts(data.blogPosts);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <BlogList posts={posts} />
    </Container>
  );
};

export default Home;