import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const PokemonTools = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
    </InputGroup>
  );
};

export default PokemonTools