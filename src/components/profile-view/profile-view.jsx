import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";

export const ProfileView = ({ user, movies, token, updateFavorites }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (movies.length > 0) {
      const favMovies = movies.filter((m) => user.FavoriteMovies?.includes(m._id));
      setFavoriteMovies(favMovies);
    }
  }, [movies, user.FavoriteMovies]);

  const removeFromFavorites = (movieId) => {
    fetch(`https://jar-movies-flix-9c6c1a784786.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        updateFavorites(updatedUser.FavoriteMovies);
        setFavoriteMovies(movies.filter((m) => updatedUser.FavoriteMovies.includes(m._id)));
      })
      .catch((e) => alert("Error removing movie from favorites."));
  };

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
              <div key={movie._id}>
                <MovieCard movie={movie} />
                <Button onClick={() => removeFromFavorites(movie._id)}>Remove from Favorites</Button>
              </div>
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
  token: PropTypes.string.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};
