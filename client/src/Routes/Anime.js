import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimeList from "../Components/AnimeList";

function Anime({animes}){
    
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