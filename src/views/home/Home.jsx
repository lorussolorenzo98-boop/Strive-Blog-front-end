import React, { useEffect, useMemo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import BlogItem from "../../components/blog/blog-item/BlogItem";
import "./styles.css";

const categories = ["Science", "Math", "History", "Technology", "General"];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        setPosts([]);
      }
    };

    getPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;

    const normalizedSearch = searchTerm.toLowerCase();

    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const author = post.author?.toLowerCase() || "";
      const category = post.category?.toLowerCase() || "";

      return (
        title.includes(normalizedSearch) ||
        author.includes(normalizedSearch) ||
        category.includes(normalizedSearch)
      );
    });
  }, [posts, searchTerm]);

  const postsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = filteredPosts.filter((post) => post.category === category);
      return acc;
    }, {});
  }, [filteredPosts]);

  return (
    <Container fluid className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Strive Blog</h1>
          <p className="hero-subtitle">
            Explore ideas, science, and stories that matter.
          </p>
        </div>
      </section>

      <div className="search-bar-wrapper">
        <Form.Control
          type="text"
          placeholder="Search by title, author or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <section className="categories-section">
        {categories.map((category) =>
          postsByCategory[category]?.length > 0 ? (
            <div key={category} className="category-row-wrapper">
              <h2 className="category-title">{category}</h2>
              <div className="category-row">
                {postsByCategory[category].map((post) => (
                  <div key={post._id} className="slider-card">
                    <BlogItem {...post} />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}

        {filteredPosts.length === 0 && (
          <div className="no-results">No articles found</div>
        )}
      </section>
    </Container>
  );
};

export default Home;