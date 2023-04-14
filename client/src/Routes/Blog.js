import React, { useState, useEffect } from "react";
import Posts from "../Components/Posts";
import EditPost from "../Components/EditPost";


function Blog({ users, posts, setPosts}) {



    return (
        <div>
            <ul className="Posts">{posts.map(post =>
                <Posts
                    key={post.id}
                    users={users}
                    post={post}
                    setPosts={setPosts}
                />)}
            </ul>
        </div>
    )
}

export default Blog;