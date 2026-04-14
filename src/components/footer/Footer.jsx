import React from "react";
import { Container } from "react-bootstrap";
import "./style.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container className="site-footer-content">
        <div className="site-footer-brand">
          <h5 className="site-footer-title">Strive Blog</h5>
          <p className="site-footer-text">
            A space to explore ideas, science, history and technology.
          </p>
        </div>

        <div className="site-footer-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/new">New Article</a>
        </div>
      </Container>

      <Container>
        <div className="site-footer-bottom">
          © {new Date().getFullYear()} Strive School | Developed for homework projects.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;