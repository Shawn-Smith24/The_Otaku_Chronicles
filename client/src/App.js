import React, { useEffect, useState } from "react";
// import { Router, Route } from "react-router-dom";
import WelcomePage from "./Routes/WelcomePage";
import Blog from "./Routes/Blog";
import Login from "./Routes/Login";
import Signup from "./Routes/SignUp";
import Anime from "./Routes/Anime";

function App() {
  // Code goes here!
  const [users, setUsers] = useState([]);
  const [anime, setAnime] = useState([]);
  const [posts, setPosts] = useState([]);


// Anime API Functionality
  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': 'bbea158bcamsh248f6e9aab2d052p1b7f5fjsne6b8ab07a484',
  //       'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
  //     }
  //   };
  //   fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=50&sortOrder=asc', options)
	//     .then(response => response.json())
	//     .then(response => setAnime(response))
	//     .catch(err => console.error(err));
  // }, []);

  //Fetch User Functionality
  useEffect(() => {
    fetch(`/users`, 
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

  
  return(
    <div className="app">
        <WelcomePage />
        <Blog users= {users} posts = {posts}/>
        <Login setUser = {setUsers}/>
        <Signup setUser = {setUsers} />
        <Anime user= {users} />
           
    </div>
  )
}

export default App;
