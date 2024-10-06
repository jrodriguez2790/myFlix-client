import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view"; // New Profile View
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://jar-movies-flix-9c6c1a784786.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => setMovies(movies))
      .catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <Routes>
      {!user ? (
        <>
          <Route
            path="/login"
            element={
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              </Row>
            }
          />
          <Route
            path="/signup"
            element={
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  <SignupView />
                </Col>
              </Row>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <Row className="justify-content-md-center">
                <Col xs={12} className="text-right">
                  <Button onClick={handleLogout}>Logout</Button>
                </Col>
                <Col xs={12}>
                  <Row>
                    {movies.map((movie) => (
                      <Col xs={12} md={4} lg={3} key={movie._id}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            }
          />
          <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
          <Route path="/profile" element={<ProfileView user={user} movies={movies} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};
