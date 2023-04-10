import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

function Posts({ post}){
    const {username, subject, text, created_at} = post
    
    
  

    return (
        

        <div className="posts">
            <p>
                <h2 className="subject">{subject}</h2>
                <h3 className="post-username"> {username}</h3>
                <p className="text"> {text}</p>
                <h3 className="created_at">{created_at}</h3>
                <div className="like-delete">
                    <button className="like" >Like</button>
                    <button className="delete">Delete</button>
                </div>
            </p>
        </div>
    )
}

export default Posts