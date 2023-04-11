import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./Routes/WelcomePage";
import Blog from "./Routes/Blog";
import Login from "./Routes/Login";
import Signup from "./Routes/SignUp";
import Anime from "./Routes/Anime";
import NavBar from "./Components/NavBar";

function App() {
  // Code goes here!
  const [users, setUsers] = useState([]);
  const [anime, setAnime] = useState([]);
  const [posts, setPosts] = useState([]);


  //Fetch User Functionality
  useEffect(() => {
    fetch (`/users`, 
      {method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },)
      .then(res => res.json())
      .then(users => setUsers(users))
      .catch(err => console.error(err));
  }, []);
  
// Posts Functionality
  useEffect(() => {
    fetch (`/posts`, 
      {method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },)
      .then(res => res.json())
      .then(posts => setPosts(posts))
      .catch(err => console.error(err));
  }, []);

// Anime Functionality
useEffect(() => {
  fetch('/anime', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(anime => setAnime(anime))
    .catch(err => console.error(err));

}, [] );
  
  
  return(
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/blog" element={<Blog users= {users} posts = {posts} />} />
          <Route path="/login" element={<Login setUser = {setUsers} />} />
          <Route path="/signup" element={<Signup users={users} setUser = {setUsers} />} />
          <Route path="/anime" element={<Anime anime={anime} />} />
        </Routes>

    </>
  )
}

export default App;
