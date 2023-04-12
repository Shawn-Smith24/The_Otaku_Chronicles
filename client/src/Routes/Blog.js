import React, { useState, useEffect } from "react";
import Posts from "../Components/Posts";


function Blog({ users, posts, setPosts, handleDelete}) {



    return (
        <div>
            <ul className="Posts">{posts.map(post =>
                <Posts
                    key={post.id}
                    users={users}
                    post={post}
                    setPosts={setPosts}
                    handleDelete={handleDelete}
                />)}
            </ul>
        </div>
    )
}

export default Blog;