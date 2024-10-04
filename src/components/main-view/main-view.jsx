import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch("https://jar-movies-flix-9c6c1a784786.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.log("Error fetching movies: ", error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
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
            <Button onClick={() => setIsSignup(!isSignup)} variant="link">
              {isSignup ? "Go to Login" : "Go to Signup"}
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return <div className="text-center">The movie list is empty!</div>;
  }

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} className="text-right">
        <Button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
      </Col>
      <Col xs={12}>
        <Row>
          {movies.map((movie) => (
            <Col xs={12} md={4} lg={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
