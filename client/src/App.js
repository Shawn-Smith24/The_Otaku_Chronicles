import React from "react";
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

  return (

    <div className="text-2xl font-bold ">

      <NavBar  />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/blog" element={<Blog  />} />
        <Route path="/anime" element={<Anime  />} />
        <Route path="/profile" element={<Profile  />  } />
        <Route path="/addnew" element={<AddNew  />} />
        <Route path="/characters" element={<Character  />} />
        <Route path="/mangas" element={<Mangas />} />
      </Routes>

    </div>

  )
}

export default App;
