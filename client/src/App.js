import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import WelcomePage from "./Routes/WelcomePage";
import Blog from "./Routes/Blog";
import Anime from "./Routes/Anime";
import NavBar from "./Components/NavBar";
import Profile from "./Routes/Profile";
import AddPost from "./Components/AddPost";
import AddAnime from "./Components/AddAnime";
import Character from "./Routes/Character";
import Mangas from "./Routes/Mangas";


function App() {
  // Code goes here!
  const [user, setUser] = useState(null);
  const [animes, setAnimes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [mangas, setMangas] = useState([]);


  function handleDelete(id) {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      });
  }

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

  // Check Session
  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        // console.log(r)
        if (r.ok) {
          r.json()
            .then((user) => { setUser(user) });
        }
      });
  }, []);

  function onLogout() {
    setUser(null);
  }

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
    <>
      <NavBar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/blog" element={<Blog  posts={posts} setPosts={setPosts} handleDelete={handleDelete} />} />
        <Route path="/anime" element={<Anime animes={animes} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/addpost" element={<AddPost user={user} setUser={setUser} setPosts={setPosts} />} />
        <Route path="/addanime" element={<AddAnime user={user} setUser={setUser} setAnimes={setAnimes} />} />
        <Route path="/characters" element={<Character characters={characters} />} />
        <Route path="/mangas" element={<Mangas mangas={mangas}/>} />
      </Routes>

    </>
  )
}

export default App;
