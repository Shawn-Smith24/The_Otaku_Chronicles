
import { useState, React} from "react";
import { useNavigate } from "react-router-dom";


function AddAnime({setAnime}) {
    let navigate = useNavigate()
    
    const [title, setTitle] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')



    function redirect() {
        navigate('/')
    }

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
            // setAnime(anime)
        })
        
        .then(redirect())
        
    }


    return (
        <div>
        <form className="shadow-2xl bg-[#d4d4dc] text-black p-8 items-center text-center ml-auto mr-auto mt-auto w-[600px] h-[400px] rounded-2xl border-b-4 border-t-0 border-[#000300]" onSubmit={handleSubmit} >
            <label htmlFor="anime-form">Anime Form</label>
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => setTitle( e.target.value)}
            />
            <label htmlFor="image">Image-URL</label>
            <input 
            type="text" 
            name="image" 
            id="image" 
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input 
            type="text" 
            name="description" 
            id="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="genre">Genre</label>
            <input 
            type="text" 
            name="genre" 
            id="genre" 
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            />
            <button className="add" onSubmit={handleSubmit} >Add Anime</button>
        </form>
        </div>
       
    )

}

export default AddAnime;