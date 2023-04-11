import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Posts.css";

function Posts({post, handleDelete}){
    const {username, subject, text, comments, created_at} = post
    
    
  // Likes Functionality
  const [likes, setLikes] = useState(0);

  const handleLike = ((e) => {
      e.preventDefault();
      setLikes(prevCount => prevCount + 1);

      fetch(`/likes`,
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ likes: likes + 1 }),
          },)
          .then(res => res.json())
          .then(likes => setLikes(likes))
          .catch(err => console.error(err));
  });


    return (
        
            <article className="posts">
                
                <h2 className="subject">{subject}</h2>
                <h3 className="post-username"> {username}</h3>
                <p className="text"> {text}</p>
                <h3 className="comments"> {comments}</h3>
                <h3 className="created_at">{created_at}</h3>
                <div className="like-delete">
                    <button className="like" onClick={handleLike} likes={likes}>Like</button>
                    <button className="delete" onClick={handleDelete}>Delete</button>
                </div>
            </article>
        
    )
}

export default Posts