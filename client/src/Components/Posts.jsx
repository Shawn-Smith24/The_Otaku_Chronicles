import React from "react";


function Posts({ post, addLikes, likes}){
    const {username, subject, text, created_at} = post
    
    const handleLikes = (id) => {
        fetch(`/likes/${id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ likes: post.likes + 1 })
        })
          .then(response => response.json())
          .then(addLikes)
    
      }


    return (
        

        <div className="posts">
            <p>
                <h2 className="subject">{subject}</h2>
                <h3 className="username"> {username}</h3>
                <p className="text"> {text}</p>
                <h3 className="created_at">{created_at}</h3>
                <div className="like-delete">
                    <button className="like" onClick={handleLikes}>Like</button>
                    <button className="delete">Delete</button>
                </div>
            </p>
        </div>
    )
}

export default Posts