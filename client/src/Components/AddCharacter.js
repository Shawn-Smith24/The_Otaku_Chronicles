import {useState, React} from "react";
import { useNavigate } from "react-router-dom";

function AddCharacter({setCharacters}) {
    const [name, setName] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [bio, setBio] = useState('')
    const [power, setPower] = useState('')
    const [tier, setTier] = useState('')

    let navigate = useNavigate()

    function redirect(){
        navigate('/characters')
    }


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
            setCharacters([character])
        })
        .then(redirect())
    }



  return (
    <div className="p-4">
      <form className="shadow-2xl bg-[#d4d4dc] text-black p-10 items-center text-center ml-auto mr-auto mt-auto w-[500px] h-[550px] rounded-2xl border-b-4 border-t-0 border-[#000300]" onSubmit={handleSubmit}>
      
        <label htmlFor="Name"  className="text-2xl italic">Name: </label>
        <input 
        type="text" 
        name="name" 
        id="name" 
        className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

        value={name}
        onChange={(e) => setName( e.target.value)}
        />
        <label htmlFor="image"  className="text-2xl italic">Image-URL: </label>
        <input 
        type="text" 
        name="image" 
        id="image" 
        value={image_url}
        className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

        onChange={(e) => setImageUrl( e.target.value)}
        />
        <label htmlFor="Bio"  className="text-2xl italic">Bio: </label>
        <input 
        type="text" 
        name="bio" 
        id="bio" 
        value={bio}
        className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

        onChange={(e) => setBio( e.target.value)}
        />
        <label htmlFor= "Power"  className="text-2xl italic">Power: </label>
        <input 
        type="text" 
        name="power" 
        id="power" 
        className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

        value={power}
        onChange={(e) => setPower( e.target.value)}
        />
        <label htmlFor="Tier"  className="text-2xl italic">Tier: </label>
        <input 
        type="text"
        name="tier"
        id="tier"
        className="mr-[80px] ml-[80px] mt-[10px] rounded-lg font-normal shadow-2xl "

        value={tier}
        onChange={(e) => setTier( e.target.value)}
        />
        <button className="mr-[80px] ml-[80px] mt-[20px] hover:bg-slate-600 rounded-3xl px-1 py-2 shadow-2xl text-xl" onSubmit={handleSubmit}> Add Character</button>
      </form>
    </div>
  );
}

export default AddCharacter;