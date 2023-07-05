import React, {createContext, useState} from "react";


export const PostsContext = createContext();

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    

    


    return (
        <PostsContext.Provider value={[posts, setPosts]}>
            {children}
        </PostsContext.Provider>
    )
}


export const AnimeContext = createContext();

export const AnimeProvider = ({children}) => {
    const [anime, setAnime] = useState([]);
    const [animes, setAnimes] = useState([]);
    return (
        <AnimeContext.Provider value={[anime, setAnime, animes, setAnimes]}>
            {children}
        </AnimeContext.Provider>
    )
}

export const CharacterContext = createContext();

export const CharacterProvider = ({children}) => {
    const [characters, setCharacters] = useState([]);
    return (
        <CharacterContext.Provider value={[characters, setCharacters]}>
            {children}
        </CharacterContext.Provider>
    )
}

export const MangaContext = createContext();

export const MangaProvider = ({children}) => {
    const [mangas, setMangas] = useState([]);
    return (
        <MangaContext.Provider value={[mangas, setMangas]}>
            {children}
        </MangaContext.Provider>
    )
}