import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import WelcomePage from "./Routes/WelcomePage";
import Blog from "./Routes/Blog";
import Anime from "./Routes/Anime";
import NavBar from "./Components/NavBar";
import Profile from "./Routes/Profile";
import AddPost from "./Components/AddPost";
import AddAnime from "./Components/AddAnime";

function App() {
  // Code goes here!
  const [user, setUser] = useState(null);
  const [animes, setAnimes] = useState([]);
  const [posts, setPosts] = useState([]);

  
  
  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      // console.log(r)
      if (r.ok) {
        r.json()
        .then((user) => {setUser(user)});
      }
    });
  }, []);
  
  function onLogout() {
    setUser(null);
  }
  
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
    .then(animes => setAnimes(animes))
    .catch(err => console.error(err));

}, [] );
  
  
  return(
    <>
        <NavBar user={user} onLogout={onLogout}/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/blog" element={<Blog users= {user} posts = {posts} />} />
          <Route path="/anime" element={<Anime animes={animes} />} />
          <Route path= "/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path= "/addpost" element={<AddPost user={user} setUser={setUser} setPosts={setPosts} />} />
          <Route path= "/addanime" element={<AddAnime user={user} setUser={setUser}  setAnimes={setAnimes} />} />
        </Routes>

    </>
  )
}

export default App;
