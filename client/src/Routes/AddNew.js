import React from "react";
import AddCharacter from "../Components/AddCharacter";
import AddManga from "../Components/AddManga";
import AddAnime from "../Components/AddAnime";
import AddPost from "../Components/AddPost";

function AddNew() {
  return (
    <div >
        <AddPost />
        <AddAnime  />
        <AddCharacter  />
        <AddManga />
    </div>
  );
}

export default AddNew;