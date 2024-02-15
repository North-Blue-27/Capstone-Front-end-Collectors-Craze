import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MagicDetail = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [symbols, setSymbols] = useState(null);

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await axios.get(`https://api.scryfall.com/cards/${id}`);
                setCard(response.data);
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };

        const fetchSymbols = async () => {
            try {
                const response = await axios.get('https://api.scryfall.com/symbology');
                setSymbols(response.data);
            } catch (error) {
                console.error('Error fetching symbols:', error);
            }
        };

        fetchCardDetails();
        fetchSymbols();
    }, [id]);

    const renderManaCost = (manaCost) => {
        if (!manaCost || !symbols) return null;

        manaCost = manaCost.replace(/\{([^}]+)\}/g, (match, symbol) => {
            const symbolData = symbols.data.find(data => data.symbol === match);
            if (symbolData && symbolData.svg_uri) {
                return `<img src="${symbolData.svg_uri}" alt="${symbol}" style="width: 20px; height: 20px;" />`;
            }
            return symbol;
        });

        return <span dangerouslySetInnerHTML={{ __html: manaCost }} />;
    };

    const renderSymbolText = (text) => {
        if (!text || !symbols) return null;

        text = text.replace(/\{([^}]+)\}/g, (match, symbol) => {
            const symbolData = symbols.data.find(data => data.symbol === `{${symbol}}`);
            if (symbolData && symbolData.svg_uri) {
                return `<img src="${symbolData.svg_uri}" alt="${symbol}" style="width: 20px; height: 20px;" />`;
            }
            return `{${symbol}}`;
        });

        return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    if (!card || !symbols) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <img src={card.image_uris && card.image_uris.large ? card.image_uris.large : 'placeholder.jpg'} alt={card.name} className="img-fluid" />
                </Col>
                <Col md={8}>
                <div className="card-details">
    <h3>{card.name}</h3>
    <div>
        <p><strong>Type:</strong> {card.type_line}</p>
        <p><strong>Oracle Text:</strong> {renderSymbolText(card.oracle_text)}</p>
        <p><strong>Mana Cost:</strong> {renderManaCost(card.mana_cost)}</p>
        <p><strong>Mana Value:</strong> {card.cmc}</p>
        <p><strong>Color Identity:</strong> {card.color_identity.join(', ')}</p>
        <p><strong>Card Colors:</strong> {card.colors.join(', ')}</p>
        <p><strong>Rarity:</strong> {card.rarity}</p>
        <p><strong>Set:</strong> {card.set_name}</p>
        <p><strong>Collector Number:</strong> {card.collector_number}</p>
        <p><strong>Release Date:</strong> {card.released_at}</p>
        <p><strong>Converted Mana Cost:</strong> {card.cmc}</p>
        <p><strong>Defense:</strong> {card.power}</p>
        <p><strong>Strength:</strong> {card.toughness}</p>
        <p><strong>Loyalty:</strong> {card.loyalty}</p>
        <p><strong>Color Indicator:</strong> {card.color_indicator && card.color_indicator.join(', ')}</p>
        <p><strong>Abilities:</strong> {renderSymbolText(card.oracle_text)}</p>
        <p><strong>Legality:</strong> {card.legalities && card.legalities.standard}</p>
        <p><strong>Artist:</strong> {card.artist}</p>
        <p><strong>Flavor Text:</strong> {card.flavor_text}</p>
        <p><strong>Frame:</strong> {card.frame}</p>
        <p><strong>Booster:</strong> {card.booster}</p>
        <p><strong>Digital:</strong> {card.digital ? 'Yes' : 'No'}</p>
        <p><strong>Promo:</strong> {card.promo ? 'Yes' : 'No'}</p>
        <div>
            <strong>External Links:</strong> 
            {card.related_uris && (
                <ul>
                    <li><a href={card.related_uris.edhrec}>EDHREC</a></li>
                    {/* Aggiungi altri link esterni qui */}
                </ul>
            )}
        </div>
        <div>
            <strong>Prices:</strong> 
            {card.prices && (
                <ul>
                    <li>Daily: {card.prices.usd}</li>
                    {/* Aggiungi altri prezzi qui */}
                </ul>
            )}
        </div>
    </div>
    <p><strong>Scryfall URI:</strong> <a href={card.scryfall_uri}>{card.scryfall_uri}</a></p>
</div>
                </Col>
            </Row>
        </Container>
    );
};

export default MagicDetail;