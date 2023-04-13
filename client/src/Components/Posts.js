import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./Posts.css";

function Posts({post, setPosts}){
    const {username, id, subject, text, comments, created_at} = post
    const [updatedPosts, setUpdatedPosts] = useState(post)
    const [editPost, setEditPost] = useState(post)
    
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

     function handleEdit(e){
         e.preventDefault()
         fetch(`/posts/${editPost.id}`, {
             method: "PATCH",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(editPost)
         })
         .then((r) => r.json())
         .then((updatedPost) => {
             const updatedPosts = post.map((post) => {
                 if (post.id === updatedPost.id) {
                     return updatedPost;
                 } else {
                     return post;
                 }
             });
             setUpdatedPosts(updatedPosts);
         });
     }

     const handleChange = (e) => {
        setEditPost({ ...editPost, [e.target.name]: e.target.value });
      }


    return (
        
            <article className="posts" key={id}>
                
                <h2 className="subject">{subject}</h2>
                <h3 className="post-username"> {username}</h3>
                <p className="text"> {text}</p>
                <h3 className="comments"> {comments}</h3>
                <h3 className="created_at">{created_at}</h3>
                <div className="edit-delete">
                <button className="delete" onClick={handleDelete}>Delete</button>
                <button className="edit" handleEdit={handleEdit}>Edit</button>
                </div>
            </article>
        
    )
}

export default Posts