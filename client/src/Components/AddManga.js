
import { useState, React } from "react"
import './AddManga.css'


function AddManga({setManga}){
    const [title, setTitle] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')


    function handleSubmit(e){
        e.preventDefault()
        const manga = {
            title,
            image_url,
            description,
            genre
        }

        fetch('/manga', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(manga)
        })
        .then(() =>{
            window.alert('New Manga Added')
            // setManga(manga)
        })
    }

    

    return(
        <div>    
        <form className="manga-form" onSubmit={handleSubmit} >
            <label htmlFor="manga">Manga Form</label>
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
            <button className="add-manga" onSubmit={handleSubmit} >Add Manga</button>
        </form>
        </div>
    )

}

export default AddManga