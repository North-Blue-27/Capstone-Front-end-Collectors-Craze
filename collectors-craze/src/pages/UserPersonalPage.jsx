import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function UserPersonalPage() {
  const favorites = useSelector((state) => state.user.userData.favorites);
  const [filter, setFilter] = useState("all");

  

  return (
    <Container fluid className="user-page-container">
      <h1>Benvenuto!</h1>
      <h2>Le tue carte preferite:</h2>
      <div>
        <Button onClick={() => setFilter("magic")} variant={filter === "magic" ? "primary" : "outline-primary"}>Magic</Button>{' '}
        <Button onClick={() => setFilter("pokemon")} variant={filter === "pokemon" ? "primary" : "outline-primary"}>Pokemon</Button>
      </div>
      {filter !== "all" && (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
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