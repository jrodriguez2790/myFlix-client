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
import { NavigationBar } from "../navigation-bar/navigation-bar"; // Navigation bar for consistent navigation across views

export const MainView = () => {
  // Retrieve stored user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // States for user, token, movies, and signup toggle
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [isSignup, setIsSignup] = useState(false);

  // Fetch movies when token changes (user is authenticated)
  useEffect(() => {
    if (!token) return;

    fetch("https://jar-movies-flix-9c6c1a784786.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => setMovies(movies))
      .catch((error) => {
        console.log("Error fetching movies: ", error); // Log any errors encountered during fetch
      });
  }, [token]);

  // Logout function to clear user and token from state and local storage
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clear local storage to remove user session data
  };

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" /> // Redirect to home if already authenticated
            ) : (
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  {isSignup ? (
                    <SignupView
                      onSignedUp={() => {
                        setIsSignup(false);
                        alert("Signup successful. Please log in."); // Notify the user after successful signup
                      }}
                    />
                  ) : (
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token); // Save user and token to local storage
                      }}
                    />
                  )}
                  <Button
                    onClick={() => setIsSignup(!isSignup)} // Toggle between signup and login views
                    variant="link"
                  >
                    {isSignup ? "Go to Login" : "Go to Signup"}
                  </Button>
                </Col>
              </Row>
            )
          }
        />
        {/* Home Route */}
        <Route
          path="/"
          element={
            user ? (
              <MovieList movies={movies} />
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        />
        {/* Movie Details Route */}
        <Route
          path="/movies/:movieId"
          element={
            user ? (
              <MovieView movies={movies} />
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        />
        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView user={user} movies={movies} />
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        />
        {/* Catch-all Route for Unknown Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Separate component to render movie list
const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <div className="text-center">The movie list is empty!</div>; // Display message if no movies available
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