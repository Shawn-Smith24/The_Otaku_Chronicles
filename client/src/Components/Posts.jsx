import React from "react";


function Posts({user, post}){
    const {text, author_id, created_at} = post


    return (
        

        <div className="posts">
            <li>
                <h1 className="username"> {author_id}</h1>
                <p className="text"> {text}</p>
                <h3 className="postedAt">{created_at}</h3>
            </li>
        </div>
    )
}

export default Posts