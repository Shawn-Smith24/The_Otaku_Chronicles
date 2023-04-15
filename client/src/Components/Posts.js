import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";




function Posts({ post, setPosts }) {
    const { username, id, subject, text } = post;
    const [updatedPosts, setUpdatedPosts] = useState(post);
    const [isEditing, setIsEditing] = useState(false);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    function handleDelete() {
        fetch(`/posts/${id}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then(() => {
                const updatedPosts = post.filter((post) => post.id !== id);
                setUpdatedPosts(updatedPosts);
            });
    }


    const handleSubjectChange = (e) => {
        setUpdatedPosts({ ...updatedPosts, subject: e.target.value });

    };
    const handleTextChange = (e) => {
        setUpdatedPosts({ ...updatedPosts, text: e.target.value });
    };
    const handleUsernameChange = (e) => {
        setUpdatedPosts({ ...updatedPosts, username: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPosts),
        })
            .then((r) => r.json())
            .then((updatedPosts) => {
                const updatedPostsArray = post.map((post) => {
                    if (post.id === updatedPosts.id) {
                        return updatedPosts;
                    } else {
                        return post;
                    }
                });
                setUpdatedPosts(updatedPostsArray);
            });
    };



    return (
        
<div className="p-4">
      {isEditing ? (
        // Render editing form here
        <form>
          { 
            <form className="shadow-lg bg-[#000300] p-12">
            <label htmlFor="subject" className="p-2 text-[#beef00]">Subject: </label>
                <input
                    type="text"
                    name="subject"
                    id="edit-subject"
                    value={updatedPosts.subject}
                    onChange={handleSubjectChange}
                />
                <label htmlFor="text" className="p-2 text-[#beef00]">Text: </label>
                <input
                    type="text"
                    name="text"
                    id="edit-text"
                    value={updatedPosts.text}
                    onChange={handleTextChange}
                />
                <label htmlFor="username"  className="p-6 text-[#beef00]">Username: </label>
                <input
                    type="text"
                    name="username"
                    id="edit-username"
                    value={updatedPosts.username}
                    onChange={handleUsernameChange}
                />
                <button type="submit"
                className="shadow-2xl border-r-6 text-[#beef00] p-2"
                onClick={handleSubmit}>
                    Save
                </button>
                <button type="button"
                className="shadow-2xl border-r-6 text-[#beef00] p-2"
                onClick={handleCancelEdit}>
                    Cancel
                </button>

            </form>
}
        </form>
      ) : (
        // Render display view here
        <div>
          {<div className="shadow-2xl bg-[#d4d4dc] text-black p-8 text-center ml-auto mr-auto mt-auto w-[700px] rounded-2xl border-b-4 border-t-0 border-[#000300]" key={id}>
                
                <h2 className="px-8 py-4 text-4xl shadow-2xl rounded-3xl ">{subject}</h2>
                <h3 className="px-8 py-4 text-2xl shadow-xl rounded-3xl "> {username}</h3>
                <p className="px-4 py-4 text-xl shadow-lg rounded-3xl "> {text}</p>
                <div className="px-6 py-4">
                    <button className="px-2 py-4 shadow-2xl border-r-6 text-lg text-black p-2 rounded-3xl hover:bg-slate-600" onClick={handleDelete}>Delete</button>
                    <button className="px-2 py-4 shadow-2xl border-r-6 text-lg text-black p-2 rounded-3xl hover:bg-slate-600" onClick={handleEditClick}>Edit</button>
                </div>
               

            </div>
}
          
        </div>
      )}
    </div>

    )
}

export default Posts;