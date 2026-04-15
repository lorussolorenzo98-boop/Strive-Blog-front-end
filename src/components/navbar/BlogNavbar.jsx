import React, { useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getMe = async () => {
      if (!token) {
        setLoggedUser(null);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Utente non autenticato");
        }

        const data = await response.json();
        setLoggedUser(data);
      } catch (error) {
        console.log(error);
        setLoggedUser(null);
      }
    };

    getMe();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {loggedUser && <span>Ciao, {loggedUser.name}</span>}

          {!token ? (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline-dark"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>

              <Button as={Link} to="/register" variant="dark">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/new"
                className="bg-dark"
                style={{ marginRight: "10px" }}
              >
                Nuovo Articolo
              </Button>

              <Button variant="outline-dark" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;