import React from "react";



function CharacterList({ character }) {
    const {name, power, image_url, bio, tier} = character


  return (
    <div className="p-4">
    <div className="shadow-2xl bg-[#d4d4dc] text-black p-8 text-center ml-auto mr-auto mt-auto w-[500px] rounded-2xl border-b-4 border-t-0 border-[#000300]">
        <img className="w-[50%] h-[50%] ml-auto mr-auto mt-auto" src={image_url} alt={name} /> 
        <h1 className="text-3xl italic">{name}</h1>
        <label className="text-2xl bold italic">Powers:</label>
        <h2 className="text-2xl italic font-normal">{power}</h2>
        <label className="text-2xl bold italic">Bio:</label>
        <p className="text-2xl font-normal"> {bio}</p>
        <label className="text-2xl">Tier:</label>
        <h3 className="italic font-normal">{tier}</h3>
    </div>
    </div>
  );
}

export default CharacterList;