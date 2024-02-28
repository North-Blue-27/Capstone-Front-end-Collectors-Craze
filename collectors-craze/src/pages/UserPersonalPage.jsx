import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function UserPersonalPage() {
  const userData = useSelector((state) => state.user.userData);
  const favorites = userData.favorites;
  const [filter, setFilter] = useState("all");
  const [timeOfDayGreeting, setTimeOfDayGreeting] = useState("");

  useEffect(() => {
    // Funzione per ottenere il momento della giornata
    const getTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDayGreeting("Good morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setTimeOfDayGreeting("Good afternoon");
      } else {
        setTimeOfDayGreeting("Good evening");
      }
    };

    getTimeOfDay();
  }, []); // Dipendenza vuota per eseguire solo una volta all'avvio

  return (
    <Container fluid className="user-page-container">
      <div className="user-page-title">
      <h1 style={{ color: 'red' }}>{timeOfDayGreeting}, {userData.name}!</h1>
      <h2>Select one of the games to see your favorites:</h2>
      </div>
      <div className="preferite-game-button">
        <Button onClick={() => setFilter("magic")} variant={filter === "magic" ? "primary" : "outline-danger"}>Magic</Button>{' '}
        <Button onClick={() => setFilter("pokemon")} variant={filter === "pokemon" ? "primary" : "outline-danger"}>Pokemon</Button>
      </div>
      {filter !== "all" && (
        <Row xs={1} md={3} lg={4} xl={5} className="g-4">
          {favorites.filter((card) => {return card.gameName === filter}).map((card) => (
            <Col key={card.cardId}>
              <Card className="user-page-card">
                <Card.Img 
                  variant="top" 
                  src={
                    filter === "magic" 
                      ? card.cardData.image_uris.large 
                      : card.cardData.images.large
                  } 
                  className="card-image-favorites" 
                /> 
                <Card.Body>
                  <Card.Title>{card.cardData.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default UserPersonalPage;
