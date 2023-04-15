import React from "react";


function MangaList({manga}){
    const {title, description, image_url, genre} = manga

    return(
        <div className="p-4">
        <div className="shadow-2xl bg-[#d4d4dc] text-black p-8 text-center ml-auto mr-auto mt-auto w-[700px] rounded-2xl border-b-4 border-t-0 border-[#000300]">
            <img className="w-[50%] h-[50%] ml-auto mr-auto mt-auto" src={image_url} alt={title} />
            <h1 className="text-3xl italic">{title}</h1>
            <h2 className="italic text-2xl font-normal">{genre}</h2>
            <p className="text-lg font-normal"> {description}</p>
        </div>
        </div>
    )
}

export default MangaList