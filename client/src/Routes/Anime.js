import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimeList from "../Components/AnimeList";

function Anime({anime}){
    
    return(
        <div>
            <ul className="Anime">{anime.map(anime => 
            <AnimeList 
            anime = {anime}
            />)} 
            </ul>
        </div>
    )
}

export default Anime;