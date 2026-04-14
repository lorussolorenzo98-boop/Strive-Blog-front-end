import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const getComments = async () => {
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
  };

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
  }, [params.id, navigate]);

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

  if (loading) {
    return <div>loading</div>;
  }

  if (!blog) {
    return <div>Post non trovato</div>;
  }

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={blog.cover} fluid />
        <h1 className="blog-details-title">{blog.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <div>{blog.author}</div>
          </div>
          <div className="blog-details-info">
            <div>{blog.createdAt}</div>
            <div>{`lettura da ${blog.readTime?.value} ${blog.readTime?.unit}`}</div>
            <div style={{ marginTop: 20 }}>
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        ></div>

        <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>Lascia un commento</h3>

        <Form onSubmit={handleCommentSubmit} style={{ marginBottom: "40px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Scrivi un commento"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="dark">
            Invia commento
          </Button>
        </Form>

        <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>Commenti</h3>

        {comments.length === 0 ? (
          <p>Nessun commento</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <strong>{comment.author}</strong>
              <p style={{ marginTop: "10px", marginBottom: 0 }}>
                {comment.text}
              </p>
            </div>
          ))
        )}
      </Container>
    </div>
  );
};

export default Blog;