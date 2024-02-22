import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";

const MagicDetail = () => {
  // Ottieni l'ID della carta dai parametri dell'URL
  const { id } = useParams();

  // Dichiarazione degli stati
  const [card, setCard] = useState(null);
  const [symbols, setSymbols] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effetto per ottenere i dettagli della carta e i simboli
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setLoading(true);
        // Richiesta per ottenere i dettagli della carta
        const response = await axios.get(
          `https://api.scryfall.com/cards/${id}`
        );
        setCard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card details:", error);
        setLoading(false);
      }
    };

    const fetchSymbols = async () => {
      try {
        // Richiesta per ottenere i simboli delle carte
        const response = await axios.get("https://api.scryfall.com/symbology");
        setSymbols(response.data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    // Esegui entrambe le richieste quando l'ID della carta cambia
    fetchCardDetails();
    fetchSymbols();
  }, [id]);

  // Funzione per renderizzare il costo di mana
  const renderManaCost = (manaCost) => {
    if (!manaCost || !symbols) return null;

    manaCost = manaCost.replace(/\{([^}]+)\}/g, (match, symbol) => {
      const symbolData = symbols.data.find((data) => data.symbol === match);
      if (symbolData && symbolData.svg_uri) {
        return `<img src="${symbolData.svg_uri}" alt="${symbol}" style="width: 20px; height: 20px;" />`;
      }
      return symbol;
    });

    return <span dangerouslySetInnerHTML={{ __html: manaCost }} />;
  };

  // Funzione per renderizzare il testo dei simboli
  const renderSymbolText = (text) => {
    if (!text || !symbols) return null;

    text = text.replace(/\{([^}]+)\}/g, (match, symbol) => {
      const symbolData = symbols.data.find(
        (data) => data.symbol === `{${symbol}}`
      );
      if (symbolData && symbolData.svg_uri) {
        return `<img src="${symbolData.svg_uri}" alt="${symbol}" style="width: 20px; height: 20px;" />`;
      }
      return `{${symbol}}`;
    });

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  // Rendering condizionale durante il caricamento
  if (loading || !card || !symbols) {
    return (
      <div className="loading-container">
        <RingLoader color={"red"} loading={loading} size={100} />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Container fluid className="magic-detail-container">
      <Row>
        <Col md={4}>
          <div className="magic-image">
            <img
              src={
                card.image_uris && card.image_uris.large
                  ? card.image_uris.large
                  : "placeholder.jpg"
              }
              alt={card.name}
              className="img-fluid magic-image"
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="magic-card-details">
            <h3 className="magic-detail-title">- {card.name} -</h3>
            <hr />
            <div className="first-three-info row">
              {card.type_line && (
                <div className="col-md-4">
                  <div className="text-center mb-3">
                    <h4 className="magic-detail-section-title">Type</h4>
                    <p>{card.type_line}</p>
                  </div>
                </div>
              )}
              {card.mana_cost && (
                <div className="col-md-4">
                  <div className="text-center mb-3">
                    <h4 className="magic-detail-section-title">Mana Cost</h4>
                    <p>{renderManaCost(card.mana_cost)}</p>
                  </div>
                </div>
              )}
              {card.cmc && (
                <div className="col-md-4">
                  <div className="text-center mb-3">
                    <h4 className="magic-detail-section-title">Mana Value</h4>
                    <p>{card.cmc}</p>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="other-info">
              <div className="row">
                {card.colors && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Card Colors</h4>
                    <p>{card.colors.join(", ")}</p>
                  </div>
                )}
                {card.rarity && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Rarity</h4>
                    <p>{card.rarity}</p>
                  </div>
                )}
                {card.set_name && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Set</h4>
                    <p>{card.set_name}</p>
                  </div>
                )}
                {card.collector_number && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">
                      Collector Number
                    </h4>
                    <p>{card.collector_number}</p>
                  </div>
                )}
                {card.released_at && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Release Date</h4>
                    <p>{card.released_at}</p>
                  </div>
                )}
                {card.power && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Defense</h4>
                    <p>{card.toughness}</p>
                  </div>
                )}
                {card.toughness && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Strength</h4>
                    <p>{card.power}</p>
                  </div>
                )}
                {card.color_indicator && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">
                      Color Indicator
                    </h4>
                    <p>{card.color_indicator.join(", ")}</p>
                  </div>
                )}
                {card.legalities && card.legalities.standard && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">
                      Standard Legality
                    </h4>
                    <p>{card.legalities.standard}</p>
                  </div>
                )}
                {card.artist && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Artist</h4>
                    <p>{card.artist}</p>
                  </div>
                )}
                {card.frame && (
                  <div className="col-md-3">
                    <h4 className="magic-detail-section-title">Frame</h4>
                    <p>{card.frame}</p>
                  </div>
                )}
              </div>
            </div>
            <hr />
            {card.keywords && card.keywords.length > 0 && (
              <div>
                <h4 className="magic-detail-section-title">Abilities</h4>
                <p>{card.keywords.join(", ")}</p>
              </div>
            )}
            {card.oracle_text && (
              <div>
                <h4 className="magic-detail-section-title">Oracle Text</h4>
                <p>{renderSymbolText(card.oracle_text)}</p>
              </div>
            )}
            {card.flavor_text && (
              <div>
                <h4 className="magic-detail-section-title">Flavor Text</h4>
                <p>{card.flavor_text}</p>
              </div>
            )}
            <hr />
            {card.digital && (
              <div>
                <h4 className="magic-detail-section-title">Digital</h4>
                <p>{card.digital ? "Yes" : "No"}</p>
              </div>
            )}
            {card.promo && (
              <div>
                <h4 className="magic-detail-section-title">Promo</h4>
                <p>{card.promo ? "Yes" : "No"}</p>
              </div>
            )}
            {card.related_uris && card.related_uris.edhrec && (
              <div>
                <h4 className="magic-detail-section-title">External Links</h4>
                <p>
                  <a href={card.related_uris.edhrec}>EDHREC</a>
                </p>
              </div>
            )}
            {card.prices && (
              <div>
                <h4 className="magic-detail-section-title">Prices</h4>
                <p>
                  <span>Daily USD Price: {card.prices.usd}</span>
                  {" - "}
                  <span>Euro Price: {card.prices.eur}</span>
                </p>
              </div>
            )}
            <hr />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MagicDetail;
