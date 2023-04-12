import React from "react";
import './MangaList.css'

function MangaList({manga}){
    const {title, description, image_url, genre} = manga

    return(
        <div className="manga-container">
            <img className="manga-image" src={image_url} alt={title} />
            <h1 className="manga-title">{title}</h1>
            <h2 className="manga-genre">{genre}</h2>
            <p className="manga-description"> {description}</p>
        </div>
    )
}

export default MangaList