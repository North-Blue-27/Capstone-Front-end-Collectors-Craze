import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, Card, Dropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from "react-spinners";

const Magic = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sets, setSets] = useState([]);
    const [foundCardIds, setFoundCardIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSets = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.scryfall.com/sets');
                const filteredSets = response.data.data.filter(set => set.code);
                setSets(filteredSets.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sets:', error);
                setLoading(false);
            }
        };

        fetchSets();
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.scryfall.com/cards/search', {
                params: {
                    q: `name:"${searchTerm}"`,
                    unique: 'prints'
                }
            });

            const uniqueResults = response.data.data.filter(card => !foundCardIds.includes(card.id));
            setSearchResults(uniqueResults);
            const newCardIds = uniqueResults.map(card => card.id);
            setFoundCardIds(prevIds => [...prevIds, ...newCardIds]);
            setSearchTerm('');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(false);
        }
    };

    const handleSetSelect = async (setCode) => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.scryfall.com/cards/search', {
                params: {
                    q: `name:"${searchTerm}" set:${setCode}`,
                    unique: 'prints'
                }
            });

            const uniqueResults = response.data.data.filter(card => !foundCardIds.includes(card.id));
            setSearchResults(uniqueResults);
            const newCardIds = uniqueResults.map(card => card.id);
            setFoundCardIds(prevIds => [...prevIds, ...newCardIds]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cards for set:', error);
            setLoading(false);
        }
    };

    const handleCardClick = (card) => {
        navigate(`/magic/${card.id}`); // Utilizza navigate invece di history.push
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <RingLoader color={"red"} loading={loading} size={100} />
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <Container fluid className='magic-page'>
            <Row className="py-4">
                <Col>
                    <div className="header-content">
                        <h1>Benvenuto in Magic: The Gathering</h1>
                        <h2>Cerca le tue carte preferite</h2>
                    </div>
                </Col>
            </Row>
            <Row className="py-4">
                <Col className="search-col">
                    <FormControl
                        className="search-input"
                        placeholder="Search for a card..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col xs="auto">
                    <Button variant='outline-light'  onClick={handleSearch} className="search-btn">Search</Button>
                </Col>
                <Col xs="auto">
                <Dropdown>
                    <Dropdown.Toggle variant='outline-warning' id="dropdown-basic" className="select-set-toggle">
                        Select Set
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '20rem', maxHeight: '70vh', overflowY: 'auto' }} className="custom-dropdown-menu">
                        {sets.map((set) => (
                            <Dropdown.Item key={set.code} onClick={() => handleSetSelect(set.code)} className="set-item">
                                {set.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                </Col>
            </Row>
            <Row>
                {searchResults.map((result, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card className="mb-3 result-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(result)}>
                            <Card.Img variant="top" src={result.image_uris && result.image_uris.normal ? result.image_uris.normal : 'placeholder.jpg'} />
                            <Card.Body>
                                <Card.Title>{result.name}</Card.Title>
                                <Card.Text>{result.set_name}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Magic;