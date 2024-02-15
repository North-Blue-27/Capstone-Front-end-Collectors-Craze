import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Magic from './pages/Magic';
import YuGiOh from './pages/YuGiOh';
import PokemonDetail from './pages/PokemonDetail';
import MagicDetail from './pages/MagicDetail'; // Importa la nuova pagina MagicDetail

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/magic/:id" element={<MagicDetail />} /> {/* Aggiungi la nuova rotta per MagicDetail */}
        <Route path="/yugioh" element={<YuGiOh />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;