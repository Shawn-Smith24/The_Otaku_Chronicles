import React from "react";
import AddCharacter from "../Components/AddCharacter";
import AddManga from "../Components/AddManga";
import AddAnime from "../Components/AddAnime";
import AddPost from "../Components/AddPost";

function AddNew({setPosts, setAnimes, setCharacters, setMangas}) {
  return (
    <div className="p-4">
        <AddPost setPosts={setPosts} />
        <AddAnime setAnimes={setAnimes} />
        <AddCharacter setCharacters={setCharacters} />
        <AddManga setMangas={setMangas} />
    </div>
  );
}

export default AddNew;