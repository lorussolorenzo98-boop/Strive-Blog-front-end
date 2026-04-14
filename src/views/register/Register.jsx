import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:3000/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (!response.ok) {
        throw new Error("Registrazione fallita");
      }

      await response.json();
      alert("Registrazione completata con successo");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Errore nella registrazione");
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "50px" }}>
      <h1 className="mb-4">Registrazione</h1>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci cognome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data di nascita</Form.Label>
          <Form.Control
            type="text"
            placeholder="es. 10/03/1963"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          Registrati
        </Button>
      </Form>
    </Container>
  );
};

export default Register;