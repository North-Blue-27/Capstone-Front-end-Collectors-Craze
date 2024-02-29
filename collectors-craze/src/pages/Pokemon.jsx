import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { Pagination, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PokemonTools from "../components/PokemonTools";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState({
    latestSet: null,
    cards: [],
    loading: true,
    error: null,
    searchTerm: "",
    totalPages: 1,
    currentPage: 1,
  });

  // Aggiungi stato per la parola chiave di ricerca
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchLatestSet = async () => {
      try {
        const latestSetResponse = await axios.get(
          "https://api.pokemontcg.io/v2/sets",
          {
            params: {
              orderBy: "-releaseDate",
              pageSize: 1,
            },
            headers: {
              "X-Api-Key": process.env.REACT_APP_POKEMON_API_KEY,
            },
          }
        );

        const latestSetData = latestSetResponse.data.data[0];
        setPokemonData((prevState) => ({
          ...prevState,
          latestSet: latestSetData,
        }));
        fetchCards(latestSetData.id, 1);
      } catch (error) {
        console.error("Error fetching latest set:", error);
        setPokemonData((prevState) => ({
          ...prevState,
          error: "An error occurred while fetching data.",
          loading: false,
        }));
      }
    };

    fetchLatestSet();
  }, []);

  const fetchCards = async (setId, page) => {
    try {
      const cardsResponse = await axios.get(
        `https://api.pokemontcg.io/v2/cards`,
        {
          params: {
            q: `set.id:${setId}`,
            pageSize: 30,
            page,
          },
          headers: {
            "X-Api-Key": process.env.REACT_APP_POKEMON_API_KEY,
          },
        }
      );

      const { data, totalCount } = cardsResponse.data;
      setPokemonData((prevState) => ({
        ...prevState,
        cards: data,
        totalPages: Math.ceil(totalCount / 30),
        loading: false,
        currentPage: page,
      }));
    } catch (error) {
      console.error("Error fetching cards:", error);
      setPokemonData((prevState) => ({
        ...prevState,
        error: "An error occurred while fetching data.",
        loading: false,
      }));
    }
  };

  const handleSearch = async () => {
    const { searchTerm } = pokemonData;
    if (!searchTerm) {
      return;
    }

    // Imposta la parola chiave di ricerca
    setSearchKeyword(searchTerm);

    setPokemonData((prevState) => ({
      ...prevState,
      loading: true,
      currentPage: 1,
    }));

    try {
      const query = buildSearchQuery(searchTerm);
      const cardsResponse = await axios.get(
        `https://api.pokemontcg.io/v2/cards`,
        {
          params: {
            q: query,
            pageSize: 30,
            page: 1,
          },
          headers: {
            "X-Api-Key": process.env.REACT_APP_POKEMON_API_KEY,
          },
        }
      );

      const { data, totalCount } = cardsResponse.data;
      setPokemonData((prevState) => ({
        ...prevState,
        cards: data,
        totalPages: Math.ceil(totalCount / 30),
        loading: false,
      }));
    } catch (error) {
      console.error("Error searching for cards:", error);
      setPokemonData((prevState) => ({
        ...prevState,
        error: "An error occurred while fetching data.",
        loading: false,
      }));
    }
  };

  const handlePageChange = async (page) => {
    const { latestSet } = pokemonData;
    setPokemonData((prevState) => ({
      ...prevState,
      loading: true,
    }));
    await fetchCards(latestSet.id, page);
  };

  const handleSearchPageChange = async (page) => {
    setPokemonData((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      const { searchTerm } = pokemonData;
      const query = buildSearchQuery(searchTerm);
      const cardsResponse = await axios.get(
        `https://api.pokemontcg.io/v2/cards`,
        {
          params: {
            q: query,
            pageSize: 30,
            page,
          },
          headers: {
            "X-Api-Key": process.env.REACT_APP_POKEMON_API_KEY,
          },
        }
      );

      const { data } = cardsResponse.data;
      setPokemonData((prevState) => ({
        ...prevState,
        cards: data,
        loading: false,
        currentPage: page,
      }));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setPokemonData((prevState) => ({
        ...prevState,
        error: "An error occurred while fetching data.",
        loading: false,
      }));
    }
  };

  const buildSearchQuery = (searchTerm) => {
    const keywords = searchTerm.split(" ");

    const query = keywords
      .map((keyword) => {
        if (keyword.startsWith('"') && keyword.endsWith('"')) {
          return `name:${keyword.slice(1, -1)}`;
        } else if (keyword.includes(":")) {
          return keyword;
        } else {
          return `name:${keyword}`;
        }
      })
      .join(" ");

    return query;
  };

  const {
    latestSet,
    cards,
    loading,
    error,
    searchTerm,
    totalPages,
    currentPage,
  } = pokemonData;

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

  
  let pageTitle = latestSet
    ? `Latest Pokemon Set: ${latestSet.name}`
    : "Latest Pokemon Set: Loading...";
  if (searchKeyword) {
    pageTitle = `Search Results For: "${searchKeyword}"`;
  }

  return (
    <div className="pokemon-page">
      <div className="pokemon-header">
        <h1>Welcome to the Pokémon Page</h1>
        <h2>
          Search any card, get updated details and prices,<br />
          and create a list of your favorites
        </h2>
      </div>
      <div className="search-pokemon">
        <PokemonTools
          searchTerm={searchTerm}
          setSearchTerm={(term) =>
            setPokemonData((prevState) => ({
              ...prevState,
              searchTerm: term,
            }))
          }
          handleSearch={handleSearch}
        />
      </div>
      <h1 className="pokemon-title">
        {pageTitle.split(":").map((part, index) => (
          <span key={index} style={{ color: index === 1 ? "red" : "inherit" }}>
            {part}
          </span>
        ))}
      </h1>
      <div className="card-container">
        <Row xs={1} sm={2} md={4} lg={6}>
          {cards.map((card) => (
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
      <div className="pagination-container">
        <Pagination className="pagination-pokemon pagination-md">
          {searchKeyword
            ? Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    onClick={() => handleSearchPageChange(page)}
                    active={currentPage === page}
                  >
                    {page}
                  </Pagination.Item>
                )
              )
            : Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    onClick={() => handlePageChange(page)}
                    active={currentPage === page}
                  >
                    {page}
                  </Pagination.Item>
                )
              )}
        </Pagination>
      </div>
    </div>
  );
};

export default Pokemon;
