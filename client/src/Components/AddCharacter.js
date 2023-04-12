import {useState, React} from "react";
import "./AddCharacter.css";

function AddCharacter({setCharacters}) {
    const [name, setName] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [bio, setBio] = useState('')
    const [power, setPower] = useState('')
    const [tier, setTier] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        const character = {
            name,
            image_url,
            bio,
            power,
            tier
        }
        fetch('/characters', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(character)
        })
        .then(() =>{
            window.alert('New Character Added')
            setCharacters(character)
        })
    }



  return (
    <div>
      <form className="character-form" onSubmit={handleSubmit}>
        <label htmlFor="character-form">Character Form</label>
        <label htmlFor="Name">Name</label>
        <input 
        type="text" 
        name="name" 
        id="name" 
        value={name}
        onChange={(e) => setName( e.target.value)}
        />
        <label htmlFor="image">Image-URL</label>
        <input 
        type="text" 
        name="image" 
        id="image" 
        value={image_url}
        onChange={(e) => setImageUrl( e.target.value)}
        />
        <label htmlFor="Bio">Bio</label>
        <input 
        type="text" 
        name="bio" 
        id="bio" 
        value={bio}
        onChange={(e) => setBio( e.target.value)}
        />
        <label htmlFor= "Power">Power</label>
        <input 
        type="text" 
        name="power" 
        id="power" 
        value={power}
        onChange={(e) => setPower( e.target.value)}
        />
        <label htmlFor="Tier">Tier</label>
        <input 
        type="text"
        name="tier"
        id="tier"
        value={tier}
        onChange={(e) => setTier( e.target.value)}
        />
        <button className="add-character" onSubmit={handleSubmit}> Add Character</button>
      </form>
    </div>
  );
}

export default AddCharacter;