import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Go to Login" : "Go to Signup"}
        </button>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The movie list is empty!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
