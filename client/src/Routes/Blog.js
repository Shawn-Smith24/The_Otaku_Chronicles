import React, { useState, useEffect } from "react";
import Posts from "../Components/Posts";

function Blog({ users, posts }) {

    return (
        <div>
            <ul className="Posts">{posts.map(post =>
                <Posts
                    users={users}
                    post={post}
                />)}
            </ul>
        </div>
    )
}

export default Blog;