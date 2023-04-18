import React, { useState, useEffect } from "react";
import Posts from "../Components/Posts";



function Blog({ users, posts, setPosts}) {

 // Posts GET
 useEffect(() => {
    fetch(`/posts`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },)
      .then(res => res.json())
      .then(posts => setPosts(posts))
      .catch(err => console.error(err));
  }, [setPosts]);


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