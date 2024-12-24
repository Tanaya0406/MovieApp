import React from 'react';
import './MovieList.css'; // Import the CSS file

const MovieList = ({ movies }) => {
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-grid">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-overview">
                {movie.overview ? movie.overview.substring(0, 120) + '...' : 'No overview available'}
              </p>
              <p className="movie-rating">⭐ {movie.vote_average || 'N/A'}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-movies">No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
