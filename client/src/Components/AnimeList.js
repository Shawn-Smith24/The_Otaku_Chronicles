import React from "react";
import "./Anime.css"

function AnimeList({anime}){
const {title, genre, image_url, description} = anime

    return(
        <div className="anime-container">
            <img className="anime-image" src={image_url} alt={title} />
            <h1 className="anime-title">{title}</h1>
            <h2 className="anime-genre">{genre}</h2>
            <p className="anime-description"> {description}</p>
        </div>
    
    )
}

export default AnimeList