import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (movies.length > 0) {
      const favMovies = movies.filter((m) => user.FavoriteMovies.includes(m._id));
      setFavoriteMovies(favMovies);
    }
  }, [movies, user.FavoriteMovies]);

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
      <h3>Favorite Movies:</h3>
      <div>
        {favoriteMovies.length > 0 ? (
          <div className="favorites-list">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p>No favorite movies selected.</p>
        )}
      </div>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
