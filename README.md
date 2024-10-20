# myFlix-client

This is the client-side of the myFlix application built using React and Parcel. The app allows users to browse movies, register for an account, login, and maintain a list of favorite movies. It also supports movie filtering, profile management, and user authentication using JWT (JSON Web Tokens).

## Project Structure

myFlix-client
├── .gitignore
├── package.json
├── netlify.toml
├── README.md
├── src
│   ├── index.html
│   ├── index.scss
│   ├── index.jsx
│   ├── components
│   │   ├── login-view.jsx
│   │   ├── signup-view.jsx
│   │   ├── main-view.jsx
│   │   ├── movie-card.jsx
│   │   ├── movie-view.jsx
│   │   ├── profile-view.jsx
│   │   ├── navigation-bar.jsx


## Features

User Authentication: Users can sign up, log in, and log out. JWT is used for session management.
Movie List and Details: Users can browse a collection of movies, view detailed information about each movie, and filter movies by title or genre.
Favorites Management: Logged-in users can add movies to their list of favorite movies or remove them from the list via the profile view.
User Profile Management: Users can view their profile information, including their email, birthday, and favorite movies.
Movie Filtering: Users can filter movies by title or genre in the main view.
Responsive Design: The application uses Bootstrap for responsive design and is styled using SCSS.

## Dependencies

React: For building the user interface and managing component state.
React-Router: For handling routing and navigation in the app.
Bootstrap and React-Bootstrap: For styling and responsive design.
Prop-Types: For type-checking of props in components.
Parcel: A simple bundler used for development and production builds.
JWT: Used for authentication and authorization via tokens.
