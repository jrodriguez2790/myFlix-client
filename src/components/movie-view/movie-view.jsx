import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, updateFavorites }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const addToFavorites = () => {
    fetch(`https://jar-movies-flix-9c6c1a784786.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log("Updated user data: ", updatedUser); // checks the response
        updateFavorites(updatedUser.favoritemovies);
        alert(`${movie.title} has been added to your favorites.`);
      })
      .catch((error) => {
        console.error('Error adding to favorite movies: ', error);
        alert("Something went wrong!");
      });
  };

  if (!movie) return <div>Movie not found!</div>;

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <Button onClick={addToFavorites}>Add to Favorites</Button>
      <Link to="/">
        <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updateFavorites: PropTypes.func.isRequired
};
