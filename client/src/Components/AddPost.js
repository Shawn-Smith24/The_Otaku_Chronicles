import React from "react";
import "./AddPost.css";
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
        <form className="post-form" onSubmit={handleSubmit}>
            <label htmlFor="Post">New Posts</label>
            <label htmlFor="Subject">Subject</label>
            <input
                type="text"
                name="Subject"
                id="Subject"
                className="form-subject"
                onChange={(e) => setSubject( e.target.value)}
            />
            <label htmlFor="Username">Username</label>
            <input
                type="text"
                name="Username"
                id="Username"
                className="form-username"
                onChange={(e) => setUserName( e.target.value)}
            />
            <label htmlFor="Text">Text</label>
            <input
                type="text"
                name="Text"
                id="Text"
                className="form-text"
                onChange={(e) => setText( e.target.value)}
            />

            <button className="submit" onSubmit={handleSubmit}>Post</button>
        </form>
    </div>
  );
}

export default AddPost;