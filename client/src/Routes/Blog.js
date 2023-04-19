import React, { useEffect, useContext } from "react";
import Posts from "../Components/Posts";
import { PostsContext } from "../DisplayContext";



function Blog() {

  const [posts, setPosts] = useContext(PostsContext);

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
                    post={post}
                    setPosts={setPosts}
                />)}
            </ul>
        </div>
    )
}

export default Blog;