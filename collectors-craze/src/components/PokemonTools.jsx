import React from 'react';
import { FormControl, Button, Row, Col } from 'react-bootstrap';

const PokemonTools = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <Row className="mb-3 search-pokemon">
  <Col md={8}>
    <FormControl
      className='search-bar'
      placeholder="Search Pokemon..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </Col>
  <Col md={2}>
    <Button
      variant="outline-warning"
      onClick={handleSearch}
      className='button-search'
    >
      Search
    </Button>
  </Col>
</Row>
  );
};

export default PokemonTools