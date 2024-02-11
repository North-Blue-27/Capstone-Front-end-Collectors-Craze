import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Starfield from 'react-starfield';

function Home() {
  return (
    <div className="home-container text-center">
      <Starfield
        starCount={3000}
        starColor={[255, 255, 255,1]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className="home-title">
    <h1>Collector's Craze</h1>
    <h2>Explore a Universe of Collectible Cards:<br></br> Find Hidden Treasures and Enhance Your Collection!</h2>
   </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={5} lg={4} className="d-flex align-items-center justify-content-center mb-3">
          <Link to="/pokemon">
            <Card className="custom-card">
              <Card.Img variant="top" src="/images/pokemon-logo-2.png" className="custom-img" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={5} lg={4} className="d-flex align-items-center justify-content-center mb-3">
          <Link to="/magic">
            <Card className="custom-card">
              <Card.Img variant="top" src="/images/magic-logo.png" className="custom-img" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={5} lg={4} className="d-flex align-items-center justify-content-center mb-3">
          <Link to="/yugioh">
            <Card className="custom-card">
              <Card.Img variant="top" src="/images/yugioh-logo.png" className="custom-img" />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Home;