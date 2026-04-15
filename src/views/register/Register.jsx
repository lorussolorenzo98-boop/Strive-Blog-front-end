import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const newAuthor = {
      name,
      surname,
      email,
      password,
      birthDate,
      avatar,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      await response.json();
      alert("Registration completed successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Error in registration");
    }
  };

  return (
    <div className="auth-page">
      <Container className="auth-container register-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">
              Join Strive Blog and start sharing your ideas with the community.
            </p>
          </div>

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Birth date</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. DD/MM/YYYY"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <div className="auth-actions">
              <Button type="submit" variant="dark" size="lg">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register;