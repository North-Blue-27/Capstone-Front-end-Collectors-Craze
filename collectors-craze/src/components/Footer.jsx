import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light py-3 footer">
      <Row className="text-center">
        <Col>
          © 2024 Collector's Craze. All rights reserved.
        </Col>
      </Row>
      <Row className="text-center mt-2">
        <Col>
          <a href="https://www.linkedin.com/in/antonio-casalena-6b84a62b7/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
            <FaLinkedin /> LinkedIn
          </a>
        </Col>
        <Col>
          <a href="https://github.com/North-Blue-27" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
            <FaGithub /> GitHub
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;