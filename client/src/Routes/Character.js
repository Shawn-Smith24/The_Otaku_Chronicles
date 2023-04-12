import React from "react";
import CharacterList from "../Components/CharacterList";


function Character({ characters }) {
    

  return (
    <div>
        <ul className="Character">
            {characters.map(character =>
                <CharacterList
                    key={character.id}
                    character={character}
                />)}
        </ul>
    </div>
  );
}

export default Character;