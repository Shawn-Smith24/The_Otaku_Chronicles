import React, {useEffect, useContext} from "react";
import MangaList from "../Components/MangaList";
import {MangaContext} from "../DisplayContext";


function Mangas() {

  const [mangas, setMangas] = useContext(MangaContext);

 // Mangas GET
 useEffect(() => {
    fetch("/manga", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((mangas) => setMangas(mangas))
      .catch((err) => console.error(err));
  }, [setMangas]);


    return (
        <div>
            <ul className="mangas">
                {mangas.map(manga =>
                    <MangaList
                        key={manga.id}
                        manga={manga}
                    />)}
            </ul>
        </div>
    );
    }


export default Mangas;