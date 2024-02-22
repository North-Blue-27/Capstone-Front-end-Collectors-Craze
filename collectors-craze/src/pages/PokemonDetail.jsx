import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { RingLoader } from "react-spinners";

const PokemonDetail = () => {
  // Ottiene l'ID del Pokémon dalla URL
  const { id } = useParams();
  // Stati per memorizzare i dettagli del Pokémon e lo stato di caricamento
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effetto per recuperare i dettagli del Pokémon quando l'ID cambia
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards/${id}`,
          {
            headers: {
              "X-Api-Key": process.env.REACT_APP_POKEMON_API_KEY,
            },
          }
        );
        const data = await response.json();
        setPokemon(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  // Funzione per rendere un campo di dettaglio
  const renderField = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    return (
      <>
        <h3>
          <strong>{label}</strong>
        </h3>
        <div>{Array.isArray(value) ? value.join(", ") : value}</div>
      </>
    );
  };

  // Se il caricamento è ancora in corso, visualizza il loader
  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color={"red"} loading={loading} size={100} />
        <div>Loading...</div>
      </div>
    );
  }

  // Se non ci sono dettagli del Pokémon, visualizza "Loading..."
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="poke-detail-container">
      <Row>
        <Col xs={12} md={4}>
          <div className="image-container">
            <Image src={pokemon.images.large} fluid />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <div className="details-container">
            <div className="name-container">
              <h2> - {pokemon.name} - </h2>
            </div>
            <hr />
            <div className="info-section">
              <Row>
                <Col md={4}>{renderField("Supertype", pokemon.supertype)}</Col>
                <Col md={4}>{renderField("Types", pokemon.types)}</Col>
                <Col md={4}>{renderField("HP", pokemon.hp)}</Col>
              </Row>
            </div>
            <hr />
            <div className="abilities-attacks-section">
              <Row>
                <Col>
                  {renderField(
                    "Abilities",
                    pokemon.abilities && (
                      <ul>
                        {pokemon.abilities.map((ability, index) => (
                          <li key={index}>
                            <strong>{ability.name}:</strong> {ability.text}
                          </li>
                        ))}
                      </ul>
                    )
                  )}

                  {pokemon.attacks && pokemon.attacks.length > 0 && (
                    <>
                      <h3>Attacks</h3>
                      {pokemon.attacks.map((attack, index) => (
                        <p key={index}>
                          <strong>{attack.name}: </strong> {attack.text} DMG:{" "}
                          {attack.damage}
                        </p>
                      ))}
                    </>
                  )}
                </Col>
              </Row>
            </div>
            <hr />
            <div className="additional-info-section">
              <Row>
                <Col md={3}>
                  {renderField(
                    "Weakness",
                    pokemon.weaknesses &&
                      `${pokemon.weaknesses[0].type}  ${pokemon.weaknesses[0].value}`
                  )}
                </Col>
                <Col md={3}>{renderField("Artist", pokemon.artist)}</Col>
                <Col md={3}>{renderField("Rarity", pokemon.rarity)}</Col>
                <Col md={3}>{renderField("Set", pokemon.set.name)}</Col>
                <Col md={3}>
                  {renderField(
                    "Regulation Mark",
                    pokemon.legalities && pokemon.legalities.standard
                  )}
                </Col>
                <Col md={3}>{renderField("Number", pokemon.number)}</Col>
                <Col md={3}>
                  {renderField(
                    "Resistance",
                    pokemon.resistances &&
                      `${pokemon.resistances[0].type}  ${pokemon.resistances[0].value}`
                  )}
                </Col>
                <Col md={3}>
                  {renderField(
                    "Retreat Cost",
                    pokemon.retreatCost && pokemon.retreatCost.length
                  )}
                </Col>
              </Row>
            </div>
            <hr />
            <div className="prices-section">
              <Row>
                <Col md={6}>
                  <div className="tcgplayer-section">
                    <h3>TCGPlayer</h3>
                    <ul>
                      {pokemon.tcgplayer && (
                        <>
                          <li>
                            <a
                              href={pokemon.tcgplayer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {pokemon.tcgplayer.url}
                            </a>
                          </li>
                          <li>Last Updated: {pokemon.tcgplayer.updatedAt}</li>
                          <li>
                            <h5>Prices:</h5>
                            <ul className="tgc-price">
                              {Object.entries(pokemon.tcgplayer.prices).map(
                                ([type, price], index) => (
                                  <li key={index}>
                                    <strong>{type}:</strong>
                                    <ul>
                                      <li>Low: {price.low}$</li>
                                      <li>Mid: {price.mid}$</li>
                                      <li>High: {price.high}$</li>
                                      <li>Market: {price.market}$</li>
                                    </ul>
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="cardmarket-section">
                    <h3>Cardmarket</h3>
                    <ul>
                      <li>
                        <a
                          href={pokemon.cardmarket.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {pokemon.cardmarket.url}
                        </a>
                      </li>
                      <li>Last Updated: {pokemon.cardmarket.updatedAt}</li>
                      <li>
                        <h5>Prices:</h5>
                        <ul>
                          {pokemon.cardmarket.prices.lowPrice !== 0 && (
                            <li>
                              <strong>Low Price:</strong>{" "}
                              {pokemon.cardmarket.prices.lowPrice}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.trendPrice !== 0 && (
                            <li>
                              <strong>Trend Price:</strong>{" "}
                              {pokemon.cardmarket.prices.trendPrice}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.avg1 !== 0 && (
                            <li>
                              <strong>Average 1 day:</strong>{" "}
                              {pokemon.cardmarket.prices.avg1}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.avg7 !== 0 && (
                            <li>
                              <strong>Average 7 days:</strong>{" "}
                              {pokemon.cardmarket.prices.avg7}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.avg30 !== 0 && (
                            <li>
                              <strong>Average 30 days:</strong>{" "}
                              {pokemon.cardmarket.prices.avg30}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.reverseHoloLow !== 0 && (
                            <li>
                              <strong>Reverse Holo Low:</strong>{" "}
                              {pokemon.cardmarket.prices.reverseHoloLow}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.reverseHoloTrend !== 0 && (
                            <li>
                              <strong>Reverse Holo Trend:</strong>{" "}
                              {pokemon.cardmarket.prices.reverseHoloTrend}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.reverseHoloAvg1 !== 0 && (
                            <li>
                              <strong>Reverse Holo Average 1 day:</strong>{" "}
                              {pokemon.cardmarket.prices.reverseHoloAvg1}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.reverseHoloAvg7 !== 0 && (
                            <li>
                              <strong>Reverse Holo Average 7 days:</strong>{" "}
                              {pokemon.cardmarket.prices.reverseHoloAvg7}€
                            </li>
                          )}
                          {pokemon.cardmarket.prices.reverseHoloAvg30 !== 0 && (
                            <li>
                              <strong>Reverse Holo Average 30 days:</strong>{" "}
                              {pokemon.cardmarket.prices.reverseHoloAvg30}€
                            </li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
            <hr />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonDetail;
