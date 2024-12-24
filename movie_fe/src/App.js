import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ genre: '', rating: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:4000/api/movies', {
        params: { query, ...filters },
      });
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error('Error fetching movies:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Movie Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={searchMovies} className="search-button">Search</button>
      </div>

      <div className="filters-container">
        <label>
          Genre:
          <select name="genre" onChange={handleFilterChange} className="filter-select">
            <option value="">All</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
        </label>

        <label>
          Rating:
          <input
            type="number"
            name="rating"
            min="1"
            max="10"
            placeholder="Minimum rating"
            onChange={handleFilterChange}
            className="filter-input"
          />
        </label>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
};

export default App;
