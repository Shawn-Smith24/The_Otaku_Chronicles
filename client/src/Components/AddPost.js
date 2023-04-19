import { useState, useContext } from "react";

import { PostsContext } from "../DisplayContext";


function AddPost() {
    const [setPosts] = useContext(PostsContext)


    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [username, setUserName] = useState('')

   

    function handleSubmit (e){
        e.preventDefault()
        const post = {
            subject,
            text,
            username
        }
        fetch('/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
            })
            .then(() =>{
                console.log('New Post Added')
                window.alert('New Post Added')
                setPosts([post])
            })
            .catch(err => console.error(err));
    }

    

  return (
    <div className="p-4">
        <form className="shadow-2xl bg-[#d4d4dc] text-black p-8 items-center text-center ml-auto mr-auto mt-auto w-[500px] h-[350px] rounded-2xl border-b-4 border-t-0 border-[#000300]" onSubmit={handleSubmit}>
            
            <label htmlFor="Subject"  className="text-2xl italic">Subject: </label>
            <input
                type="text"
                name="Subject"
                id="Subject"
                className="mr-[80px] ml-[80px] mt-[10px] rounded-xl font-normal "
                onChange={(e) => setSubject( e.target.value)}
            />
            <label htmlFor="Username"  className="text-2xl italic">Username: </label>
            <input
                type="text"
                name="Username"
                id="Username"
                className="mr-[80px] ml-[80px] mt-[10px] rounded-xl font-normal"
                onChange={(e) => setUserName( e.target.value)}
            />
            <label htmlFor="Text"  className="text-2xl italic" >Text: </label>
            <input
                type="text"
                name="Text"
                id="Text"
                className="mr-[80px] ml-[80px] mt-[10px] rounded-xl  font-normal"
                onChange={(e) => setText( e.target.value)}
            />

            <button onSubmit={handleSubmit}  className="mr-[80px] ml-[80px] mt-[20px] hover:bg-slate-600 rounded-3xl px-1 py-2 shadow-2xl text-xl ">Add Post</button>
        </form>
    </div>
  );
}

export default AddPost;