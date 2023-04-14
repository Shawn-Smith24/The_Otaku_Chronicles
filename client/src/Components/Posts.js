import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./Posts.css";
import EditPost from "./EditPost";



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
        
<div>
      {isEditing ? (
        // Render editing form here
        <form>
          { 
            <form className="edit-form">
            <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    name="subject"
                    id="edit-subject"
                    value={updatedPosts.subject}
                    onChange={handleSubjectChange}
                />
                <label htmlFor="text">Text</label>
                <input
                    type="text"
                    name="text"
                    id="edit-text"
                    value={updatedPosts.text}
                    onChange={handleTextChange}
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="edit-username"
                    value={updatedPosts.username}
                    onChange={handleUsernameChange}
                />
                <button type="submit"
                className="edit-submit"
                onClick={handleSubmit}>
                    Submit
                </button>
                <button type="button"
                className="edit-cancel"
                onClick={handleCancelEdit}>
                    Cancel
                </button>

            </form>
}
        </form>
      ) : (
        // Render display view here
        <div>
          {<div className="posts" key={id}>
                
                <h2 className="subject">{subject}</h2>
                <h3 className="post-username"> {username}</h3>
                <p className="text"> {text}</p>
                <div className="edit-delete">
                    <button className="delete" onClick={handleDelete}>Delete</button>
                    <button className="edit" onClick={handleEditClick}>Edit</button>
                </div>
               

            </div>
}
          
        </div>
      )}
    </div>

    )
}

export default Posts;