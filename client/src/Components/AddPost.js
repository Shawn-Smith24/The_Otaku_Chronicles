import React from "react";

import { useState } from "react";


function AddPost({setPosts, users}) {

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
                setPosts([post])
            })
    }

    

  return (
    <div>
        <form className="shadow-2xl bg-[#d4d4dc] text-black p-8 items-center text-center ml-auto mr-auto mt-auto w-[600px] h-[400px] rounded-2xl border-b-4 border-t-0 border-[#000300]" onSubmit={handleSubmit}>
            <label htmlFor="Post"  >New Posts</label>
            <label htmlFor="Subject" >Subject</label>
            <input
                type="text"
                name="Subject"
                id="Subject"
             
                onChange={(e) => setSubject( e.target.value)}
            />
            <label htmlFor="Username">Username</label>
            <input
                type="text"
                name="Username"
                id="Username"
                
                onChange={(e) => setUserName( e.target.value)}
            />
            <label htmlFor="Text">Text</label>
            <input
                type="text"
                name="Text"
                id="Text"
        
                onChange={(e) => setText( e.target.value)}
            />

            <button onSubmit={handleSubmit}>Post</button>
        </form>
    </div>
  );
}

export default AddPost;