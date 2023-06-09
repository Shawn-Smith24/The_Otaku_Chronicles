
import { useState, React, useContext} from "react";
import { AnimeContext } from "../DisplayContext";

function AddAnime() {
    const [setAnimes] = useContext(AnimeContext);
    
    const [title, setTitle] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')

    function handleSubmit (e){
        e.preventDefault()
        const anime = {
            title,
            image_url,
            description,
            genre
        }

        fetch('/anime', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(anime)
        })
        .then(() =>{
            window.alert('New Anime Added')
            setAnimes([anime])
        })
        
       
        
    }


    return (
        <div className="p-4">
        <form className="shadow-2xl bg-[#d4d4dc] text-black p-8 items-center text-center ml-auto mr-auto mt-auto w-[500px] h-[450px] rounded-2xl border-b-4 border-t-0 border-[#000300]" onSubmit={handleSubmit} >
          
            <label htmlFor="title" className="text-2xl italic">Title: </label>
            <input 
            type="text" 
            name="title" 
            id="title" 
            className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

            value={title}
            onChange={(e) => setTitle( e.target.value)}
            />
            <label htmlFor="image" className="text-2xl italic">Image-URL: </label>
            <input 
            type="text" 
            name="image" 
            id="image" 
            className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            />
            <label htmlFor="description" className="text-2xl italic">Description: </label>
            <input 
            type="text" 
            name="description" 
            id="description" 
            className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="genre" className="text-2xl italic">Genre: </label>
            <input 
            type="text" 
            name="genre" 
            id="genre" 
            className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            />
            <button className="mr-[80px] ml-[80px] mt-[20px] hover:bg-slate-600 rounded-3xl px-1 py-2 shadow-2xl text-xl " onSubmit={handleSubmit} >Add Anime</button>
        </form>
        </div>
       
    )

}

export default AddAnime;