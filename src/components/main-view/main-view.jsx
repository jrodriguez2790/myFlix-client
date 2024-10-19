import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [filter, setFilter] = useState(""); // new state for the movie filter

  useEffect(() => {
    if (!token) return;

    fetch("https://jar-movies-flix-9c6c1a784786.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => setMovies(movies))
      .catch((error) => {
        console.log("Error fetching movies: ", error);
      });
  }, [token]);

  const updateFavorites = (favoriteMovies) => {
    const updatedUser = { ...user, FavoriteMovies: favoriteMovies };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };


  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase()) ||
    movie.genre.name.toLowerCase().includes(filter.toLowerCase()) // filter by title or genre
  );

  return (
    <div>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Form className="mb-3">
        <Form.Group controlId="formMovieFilter">
          <Form.Control
            type="text"
            placeholder="Filter by title or genre"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // update filter on input change
          />
        </Form.Group>
      </Form>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  {isSignup ? (
                    <SignupView
                      onSignedUp={() => {
                        setIsSignup(false);
                        alert("Signup successful. Please log in.");
                      }}
                    />
                  ) : (
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  )}
                  <Button
                    onClick={() => setIsSignup(!isSignup)}
                    variant="link"
                  >
                    {isSignup ? "Go to Login" : "Go to Signup"}
                  </Button>
                </Col>
              </Row>
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <MovieList movies={filteredMovies} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            user ? (
              <MovieView movies={movies} user={user} token={token} updateFavorites={updateFavorites} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView user={user} movies={movies} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

// separate component to render movie list
const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <div className="text-center">The movie list is empty.</div>;
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col xs={12} md={4} lg={3} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};
