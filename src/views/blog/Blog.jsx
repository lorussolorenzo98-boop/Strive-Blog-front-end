import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const getComments = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/blogPosts/${params.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setComments([]);
        return;
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  }, [params.id]);

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/blogPosts/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          navigate("/");
          return;
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    const loadData = async () => {
      await getSinglePost();
      await getComments();
      setLoading(false);
    };

    loadData();
  }, [params.id, navigate, getComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/blogPosts/${params.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella creazione del commento");
      }

      setCommentText("");
      await getComments();
    } catch (error) {
      console.log(error);
      alert("Errore nell'invio del commento");
    }
  };

  if (loading) return <div className="blog-loading">Loading...</div>;
  if (!blog) return <div className="blog-loading">Post non trovato</div>;

  return (
    <div className="blog-details-page">
      <Container className="blog-details-wrapper">
        <Button
          variant="outline-dark"
          onClick={() => navigate("/")}
          className="blog-back-button"
        >
          <ArrowLeft style={{ marginRight: "8px" }} />
          Torna ai post
        </Button>

        <section className="blog-hero-card">
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <div className="blog-hero-content">
            <span className="blog-category-badge">{blog.category}</span>
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-meta-row">
              <div className="blog-meta-left">
                <span className="blog-author-name">{blog.author}</span>
                <span className="blog-meta-separator">•</span>
                <span>{blog.readTime?.value} {blog.readTime?.unit} read</span>
                {blog.createdAt && (
                  <>
                    <span className="blog-meta-separator">•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>

              <div className="blog-meta-right">
                <BlogLike defaultLikes={["999", "888"]} onChange={console.log} />
              </div>
            </div>
          </div>
        </section>

        <section className="blog-content-card">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </section>

        <section className="blog-comment-form-card">
          <h3 className="section-title">Leave a comment</h3>

          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="dark">
              Invia commento
            </Button>
          </Form>
        </section>

        <section className="blog-comments-card">
          <h3 className="section-title">Comments</h3>

          {comments.length === 0 ? (
            <p className="no-comments">Nessun commento</p>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <div className="comment-card-header">
                    <strong>{comment.author || "Anonymous"}</strong>
                    {comment.createdAt && (
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Blog;