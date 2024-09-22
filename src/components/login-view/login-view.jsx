import React, { useState } from "react"; // Add useState from React

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // Prevent form from reloading the page
    event.preventDefault();

    // Sending the user input to the backend API
    const data = {
      username: username,
      password: password,
    };

    fetch("https://jar-movies-flix-9c6c1a784786.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          // If user data is returned, log in the user
          onLoggedIn(data.user, data.token);
        } else {
          alert("Invalid credentials. No such user.");
        }
      })
      .catch((e) => {
        console.error("Login error: ", e);
        alert("An error occurred during login.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          minLength="6" // Corrected minlength to minLength
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          minLength="8" // Corrected minlength to minLength
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
