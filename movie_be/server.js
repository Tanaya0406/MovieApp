const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Fetch Movies Endpoint
app.get('/api/movies', async (req, res) => {
  const { query, genre, rating } = req.query;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        ...(genre && { with_genres: genre }),
        ...(rating && { 'vote_average.gte': rating }),
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
