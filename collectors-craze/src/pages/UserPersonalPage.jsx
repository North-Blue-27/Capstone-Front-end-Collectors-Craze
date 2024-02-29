import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { updateUserData } from "../redux/userReducer";
import axios from 'axios';

function UserPersonalPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const [filter, setFilter] = useState("all");
  const [timeOfDayGreeting, setTimeOfDayGreeting] = useState("");

  useEffect(() => {
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
  }, []);

  const handleRemoveFromFavorites = (cardId) => {
    if (isAuthenticated && userData) {
      const updatedFavorites = userData.favorites.filter(fav => fav.cardId !== cardId);
      const updatedUser = { ...userData, favorites: updatedFavorites };
      axios
        .patch(`http://localhost:3001/users/${userData.id}`, updatedUser)
        .then(response => {
          dispatch(updateUserData(updatedUser));
          console.log("User favorites updated:", response.data);
        })
        .catch(error => {
          console.error("Error updating user favorites:", error);
        });
    } else {
      console.error("User is not authenticated or userData is null or undefined.");
    }
  };

  return (
    <Container fluid className="user-page-container">
      <div className="user-page-title">
        <h1 style={{ color: 'red' }}>{timeOfDayGreeting}, {userData.name}!</h1>
        <h2>Select one of the games to see your favorites:</h2>
      </div>
      <div className="preferite-game-button">
        <Button onClick={() => setFilter("magic")} variant={filter === "magic" ? "primary" : "outline-light"}>Magic</Button>{' '}
        <Button onClick={() => setFilter("pokemon")} variant={filter === "pokemon" ? "primary" : "outline-light"}>Pokemon</Button>
      </div>
      {filter !== "all" && (
        <Row xs={1} md={3} lg={4} xl={5} className="g-4">
          {userData.favorites
            .filter((card) => card.gameName === filter)
            .map((card) => (
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
  <Card.Text>{card.cardData.set_name}</Card.Text>
                    {isAuthenticated && (
                      <Button variant="outline-danger" onClick={() => handleRemoveFromFavorites(card.cardId)}>
                        Remove from Favorites
                      </Button>
                    )}
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