import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./Routes/WelcomePage";
import Blog from "./Routes/Blog";
import Anime from "./Routes/Anime";
import NavBar from "./Components/NavBar";
import Profile from "./Routes/Profile";
import Character from "./Routes/Character";
import Mangas from "./Routes/Mangas";
import AddNew from "./Routes/AddNew";





const App = () => {
  // Code goes here!
  const [animes, setAnimes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [mangas, setMangas] = useState([]);

  // Characters GET
  useEffect(() => {
    fetch("/characters", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((characters) => setCharacters(characters))
      .catch((err) => console.error(err));
  }, []);
  // Mangas GET
  useEffect(() => {
    fetch("/manga", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((mangas) => setMangas(mangas))
      .catch((err) => console.error(err));
  }, []);
  // Posts GET
  useEffect(() => {
    fetch(`/posts`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },)
      .then(res => res.json())
      .then(posts => setPosts(posts))
      .catch(err => console.error(err));
  }, []);
  // Anime GET
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

  }, []);


  return (

    <div className="text-2xl font-bold ">

      <NavBar  />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/blog" element={<Blog posts={posts} setPosts={setPosts} />} />
        <Route path="/anime" element={<Anime animes={animes} setAnimes={setAnimes} />} />
        <Route path="/profile" element={<Profile  />  } />
        <Route path="/addnew" element={<AddNew setPosts={setPosts} setAnimes={setAnimes} setCharacters={setCharacters} setMangas={setMangas} />} />
        <Route path="/characters" element={<Character characters={characters} setCharacters={setCharacters} />} />
        <Route path="/mangas" element={<Mangas mangas={mangas} setMangas={setMangas} />} />
      </Routes>

    </div>

  )
}

export default App;
