import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimeList from "../Components/AnimeList";

function Anime({animes, setAnimes}){
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

  }, [setAnimes]);
    return(
        <div>
            <ul className="Anime">{animes.map(anime => 
            <AnimeList 
            key={anime.id}
            anime = {anime}
            />)} 
            </ul>
        </div>
    )
}

export default Anime;