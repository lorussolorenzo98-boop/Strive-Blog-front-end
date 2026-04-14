import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        }
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Login fallito");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Email o password errate");
        }
    };
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
            <h1 className="mb-4">Login</h1>

            <Form onSubmit={handleLogin}>
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

                <Button type="submit" variant="dark">
                    Login
                </Button>
                <Button
                    type="button"
                    variant="outline-dark"
                    onClick={handleGoogleLogin}
                    style={{ marginLeft: "10px" }}
                >
                    Login con Google
                </Button>
            </Form>
        </Container>
    );
};

export default Login;