import React from "react";



function AnimeList({anime}){
const {title, genre, image_url, description} = anime
  

    return(
        <div className="p-4">
        <div className="shadow-2xl bg-[#d4d4dc] text-black p-8 text-center ml-auto mr-auto mt-auto w-[700px] rounded-2xl border-b-4 border-t-0 border-[#000300]">
            <img className="w-[50%] h-[40%] ml-auto mr-auto mt-auto" src={image_url} alt={title} />
            <h1 className="text-3xl font-bold italic">{title}</h1>
            <h2 className="text-xl font-bold italic">{genre}</h2>
            <p className=" text-xl"> {description}</p>
        </div>
        </div>
    
    )
}

export default AnimeList