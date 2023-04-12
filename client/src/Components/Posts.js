import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./Posts.css";

function Posts({post, setPosts, handleDelete}){
    const {username, id, subject, text, comments, created_at} = post
    




    return (
        
            <article className="posts" key={id}>
                
                <h2 className="subject">{subject}</h2>
                <h3 className="post-username"> {username}</h3>
                <p className="text"> {text}</p>
                <h3 className="comments"> {comments}</h3>
                <h3 className="created_at">{created_at}</h3>
                <div className="like-delete">
                    <button className="delete" onClick={handleDelete}>Delete</button>
                </div>
            </article>
        
    )
}

export default Posts