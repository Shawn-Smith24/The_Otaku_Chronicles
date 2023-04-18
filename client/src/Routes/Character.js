import React, {useEffect} from "react";
import CharacterList from "../Components/CharacterList";


function Character({ characters, setCharacters }) {
    // Characters GET
  useEffect(() => {
    fetch("/characters", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((characters) => setCharacters(characters))
      .catch((err) => console.error(err));
  }, [setCharacters]);


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