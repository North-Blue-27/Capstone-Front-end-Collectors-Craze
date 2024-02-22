import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import axios from "axios";

function Header() {
  // Definizione dello stato locale del componente
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [registrationData, setRegistrationData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  // Effetto che controlla se l'utente è già loggato al caricamento del componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Gestisce il cambiamento dei valori degli input nell'area di registrazione o login
  const handleInputChange = (event, isRegistration) => {
    const { name, value } = event.target;
    const data = isRegistration ? registrationData : userData;
    // Aggiorna lo stato con il nuovo valore dell'input
    isRegistration
      ? setRegistrationData({ ...data, [name]: value })
      : setUserData({ ...data, [name]: value });
  };

  // Gestisce la richiesta di registrazione dell'utente
  const handleRegister = async () => {
    try {
      console.log("Registrazione in corso:", registrationData);
      const response = await axios.post(
        "http://localhost:3001/register",
        registrationData
      ); // Effettua una richiesta POST per la registrazione
      console.log("Registrazione avvenuta con successo:", response.data);
      alert("Registrazione avvenuta con successo!");
      setShowModal(false);
      setRegistrationData({ name: "", surname: "", email: "", password: "" });
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      alert(
        "Si è verificato un errore durante la registrazione. Riprova più tardi."
      );
    }
  };

  // Gestisce la richiesta di login dell'utente
  const handleLogin = async () => {
    try {
      console.log("Login in corso:", userData);
      const response = await axios.post(
        "http://localhost:3001/login",
        userData
      );
      console.log("Login avvenuto con successo:", response.data);
      const { accessToken } = response.data; // Estrae il token di accesso dalla risposta
      localStorage.setItem("token", accessToken); // Memorizza il token nel localStorage
      setIsLoggedIn(true);
      setShowModal(false);
      setUserData({ email: "", password: "" });
    } catch (error) {
      console.error("Errore durante il login:", error);
      if (error.response && error.response.status === 400) {
        alert("Credenziali non valide. Riprova.");
      } else {
        alert("Si è verificato un errore durante il login. Riprova più tardi.");
      }
    }
  };

  // Gestisce il logout dell'utente
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar className="navbar-style bg-dark" variant="dark" expand="lg">
        <Navbar.Brand href="/#home" id="brand-style">
          Collector's Craze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-md-flex align-items-center">
            {!isLoggedIn && (
              <>
                <FormControl
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange(e, false)}
                  className="m-1 responsive-width"
                />
                <FormControl
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={(e) => handleInputChange(e, false)}
                  className="m-1 responsive-width"
                />
              </>
            )}
            {isLoggedIn ? (
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-danger"
                  className="m-1"
                  onClick={() => setShowModal(true)}
                >
                  Register
                </Button>
                <Button
                  variant="outline-info"
                  className="m-1"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormControl
              type="text"
              placeholder="Nome"
              name="name"
              value={registrationData.name}
              onChange={(e) => handleInputChange(e, true)}
              className="m-1"
            />
            <FormControl
              type="text"
              placeholder="Cognome"
              name="surname"
              value={registrationData.surname}
              onChange={(e) => handleInputChange(e, true)}
              className="m-1"
            />
            <FormControl
              type="email"
              placeholder="Email"
              name="email"
              value={registrationData.email}
              onChange={(e) => handleInputChange(e, true)}
              className="m-1"
            />
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={registrationData.password}
              onChange={(e) => handleInputChange(e, true)}
              className="m-1"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Registrati
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
