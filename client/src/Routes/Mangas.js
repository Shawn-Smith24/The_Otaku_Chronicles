import React from "react";
import MangaList from "../Components/MangaList";

function Mangas({mangas}) {
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