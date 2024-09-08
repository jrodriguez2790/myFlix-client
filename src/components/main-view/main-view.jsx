import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      genre: "Science Fiction",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "The Godfather",
      image: "https://image.tmdb.org/t/p/original/hMTncCsOwZZCNOo5SBhE1wQKpid.jpg",
      description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      genre: "Crime",
      director: "Francis Ford Coppola",
    },
    {
      id: 3,
      title: "Pulp Fiction",
      image: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      genre: "Crime",
      director: "Quentin Tarantino",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
