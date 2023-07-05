import React, { useEffect, useContext } from "react";
import { AnimeContext } from "../DisplayContext";
import AnimeList from "../Components/AnimeList";

function Anime(){
  const [animes, setAnimes] = useContext(AnimeContext);
  


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