import React, { createContext, useContext, useState } from 'react';


// const AnimeMangaContext = createContext();
// const CharacterContext = createContext();
const PostContext = createContext();





export const usePosts = () => useContext(PostContext);

export const PostsProvider = ({children}) => {
    const { posts, setPosts } = useState([]);
   
    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}
