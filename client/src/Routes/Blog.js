import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../Components/Posts";

function Blog({users, posts, addLikes, likes}){

    return(
        <div>
            <ul className="Posts">{posts.map(post => 
                <Posts 
                users = {users}
                likes = {likes}
                addLikes = {addLikes}
                post = {post}
                />)}
            </ul>
        </div>
    )
}

export default Blog;