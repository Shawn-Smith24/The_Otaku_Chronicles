import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../Components/Posts";

function Blog({user, posts}){

    return(
        <div>
            <ul className="Posts">{posts.map(post => 
                <Posts 
                user = {user}
                post = {post}
                />)}
            </ul>
        </div>
    )
}

export default Blog;