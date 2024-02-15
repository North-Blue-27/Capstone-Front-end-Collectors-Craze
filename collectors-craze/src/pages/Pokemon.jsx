import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RingLoader } from "react-spinners";
import { Pagination, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PokemonTools from '../components/PokemonTools'; // Importa il nuovo componente

const Pokemon = () => {
  const [latestSet, setLatestSet] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searched, setSearched] = useState(false);
  const [pageTitle, setPageTitle] = useState(`Latest Pokemon Set: Loading...`);

  useEffect(() => {
    const fetchLatestSet = async () => {
      try {
        const latestSetResponse = await axios.get('https://api.pokemontcg.io/v2/sets', {
          params: {
            orderBy: '-releaseDate',
            pageSize: 1
          },
          headers: {
            'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
          }
        });

        const latestSetData = latestSetResponse.data.data[0];
        setLatestSet(latestSetData);
        setPageTitle(`Latest Pokemon Set: ${latestSetData.name}`);
        fetchCards(latestSetData.id, 1);
      } catch (error) {
        console.error('Error fetching latest set:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchLatestSet();
  }, []);

  const buildSearchQuery = (searchTerm) => {
    const keywords = searchTerm.split(' ');

    const query = keywords.map((keyword) => {
      if (keyword.startsWith('"') && keyword.endsWith('"')) {
        return `name:${keyword.slice(1, -1)}`;
      } else if (keyword.includes(':')) {
        return keyword;
      } else {
        return `name:${keyword}`;
      }
    }).join(' ');

    return query;
  };

  const fetchCards = async (setId, page) => {
    try {
      const cardsResponse = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
        params: {
          q: `set.id:${setId}`,
          pageSize: 30,
          page
        },
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });

      const { data, totalCount } = cardsResponse.data;
      setCards(data);
      setTotalPages(Math.ceil(totalCount / 30));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      return;
    }
  
    setLoading(true);
    setSearched(true);
    try {
      const query = buildSearchQuery(searchTerm);

      const cardsResponse = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
        params: {
          q: query,
          pageSize: 30,
          page: 1
        },
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });
  
      const { data, totalCount } = cardsResponse.data;
      setCards(data);
      setSearchTotalPages(Math.ceil(totalCount / 30));
      setLoading(false);
      if (data.length === 0) {
        setPageTitle(`No results found for: "${searchTerm}"`);
      } else {
        setPageTitle(`Search Result For: "${searchTerm}"`);
      }
    } catch (error) {
      console.error('Error searching for cards:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
      setPageTitle(`No results found for: "${searchTerm}"`);
    }
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    await fetchCards(latestSet.id, page);
  };

  const handleSearchPageChange = async (page) => {
    setLoading(true);
    try {
      const query = buildSearchQuery(searchTerm);

      const cardsResponse = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
        params: {
          q: query,
          pageSize: 30,
          page
        },
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });

      const { data } = cardsResponse.data;
      setCards(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color={"red"} loading={loading} size={100} />
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemon-page">
      <PokemonTools
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <h1 className='pokemon-title'>
        {pageTitle.split(':').map((part, index) => (
          index === 0 ? <span key={index}>{part}:</span> : <span key={index} style={{ color: 'red' }}>{part}</span>
        ))}
      </h1>
      <div className="card-container">
        <Row xs={1} sm={2} md={3} lg={5}>
          {cards.map((card, index) => (
            <Col key={card.id} className="center-content">
              <Link to={`/pokemon/${card.id}`}>
                <div className="card">
                  <img src={card.images.large} alt={card.name} />
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <Pagination className='pagination-pokemon'>
        {searched
          ? Array.from({ length: searchTotalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item key={page} onClick={() => handleSearchPageChange(page)}>
                {page}
              </Pagination.Item>
            ))
          : Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item key={page} onClick={() => handlePageChange(page)}>
                {page}
              </Pagination.Item>
            ))}
      </Pagination>
    </div>
  );
};

export default Pokemon;

