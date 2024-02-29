import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Card,
  Dropdown,
  Button,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";

const Magic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sets, setSets] = useState([]);
  const [foundCardIds, setFoundCardIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.scryfall.com/sets");
        const filteredSets = response.data.data.filter((set) => set.code);
        setSets(filteredSets.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sets:", error);
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.scryfall.com/cards/search",
        {
          params: {
            q: `name:"${searchTerm}"`,
            unique: "prints",
          },
        }
      );

      const uniqueResults = response.data.data.filter(
        (card) => !foundCardIds.includes(card.id)
      );
      setSearchResults(uniqueResults);
      const newCardIds = uniqueResults.map((card) => card.id);
      setFoundCardIds((prevIds) => [...prevIds, ...newCardIds]);
      setSearchTerm("");
      setLoading(false);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  const handleSetSelect = async (setCode) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.scryfall.com/cards/search",
        {
          params: {
            q: `name:"${searchTerm}" set:${setCode}`,
            unique: "prints",
          },
        }
      );

      const uniqueResults = response.data.data.filter(
        (card) => !foundCardIds.includes(card.id)
      );
      setSearchResults(uniqueResults);
      const newCardIds = uniqueResults.map((card) => card.id);
      setFoundCardIds((prevIds) => [...prevIds, ...newCardIds]);
      setLoading(false);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching cards for set:", error);
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    navigate(`/magic/${card.id}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Calcola l'indice della prima carta della pagina corrente
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);

  // Cambia pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color={"red"} loading={loading} size={100} />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Container fluid className="magic-page">
      <div className="header-content">
        <h1>Welcome to Magic The Gathering Page</h1>
        <h2>
          Search any card or set, get updated details and prices,
          <br />
          and create a list of your favorites
        </h2>
      </div>
      <div className="search-bar-container">
        <Row className="mb-3 search-pokemon">
          <Col md={8}>
            <FormControl
              className="search-bar"
              placeholder="Search for a card..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={1}>
            <Button
              variant="outline-light"
              onClick={handleSearch}
              className="button-search"
            >
              Search
            </Button>
          </Col>
          <Col md={1}>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                id="dropdown-basic"
                className="select-set-toggle"
              >
                Select Set
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: "20rem",
                  maxHeight: "70vh",
                  overflowY: "auto",
                }}
                className="custom-dropdown-menu"
              >
                {sets.map((set) => (
                  <Dropdown.Item
                    key={set.code}
                    onClick={() => handleSetSelect(set.code)}
                    className="set-item"
                  >
                    {set.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Row>
        {currentCards.map((result, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              className="mb-3 result-card"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(result)}
            >
              <Card.Img
                variant="top"
                src={
                  result.image_uris && result.image_uris.normal
                    ? result.image_uris.normal
                    : "placeholder.jpg"
                }
              />
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                <Card.Text>{result.set_name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination-container">
      <Pagination className="pagination-magic">
  {Array.from({ length: Math.ceil(searchResults.length / cardsPerPage) }, (_, i) => (
    <Pagination.Item
      key={i + 1}
      onClick={() => paginate(i + 1)}
      active={currentPage === i + 1}
    >
      {i + 1}
    </Pagination.Item>
  ))}
</Pagination>

      </div>
    </Container>
  );
};

export default Magic;
