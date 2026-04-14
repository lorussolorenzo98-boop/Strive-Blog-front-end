import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";

const NewBlogPost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = (value) => {
    setContent(draftToHtml(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      category,
      title,
      cover,
      readTime: {
        value: "5",
        unit: "minutes",
      },
      author,
      content,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione del post");
      }

      const createdPost = await response.json();
      console.log(createdPost);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Errore nella creazione del post");
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleziona una categoria</option>
            <option value="Science">Science</option>
            <option value="Math">Math</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
            <option value="General">General</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Autore</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Inserisci URL immagine"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor onChange={handleEditorChange} className="new-blog-content" />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;