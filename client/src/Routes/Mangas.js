import React, {useEffect} from "react";
import MangaList from "../Components/MangaList";

function Mangas({mangas, setMangas}) {

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