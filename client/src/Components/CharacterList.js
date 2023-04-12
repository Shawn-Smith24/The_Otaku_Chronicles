import React from "react";
import './CharacterList.css'

function CharacterList({ character }) {
    const {name, power, image_url, bio, tier} = character


  return (
    <div className="character-container">
        <img className="character-image" src={image_url} alt={name} /> 
        <h1 className="character-name">{name}</h1>
        <label className="character-label">Power</label>
        <h2 className="character-power">{power}</h2>
        <label className="character-label">Bio</label>
        <p className="character-bio"> {bio}</p>
        <label className="character-label">Tier</label>
        <h3 className="character-tier">{tier}</h3>
    </div>
  );
}

export default CharacterList;