import React from "react";


function Posts({users, post}){
    const {text, created_at} = post

    const {user_name} = users


    return (
        

        <div className="posts">
            <p>
                <h1 className="username"> {user_name}</h1>
                <p className="text"> {text}</p>
                <h3 className="postedAt">{created_at}</h3>
            </p>
        </div>
    )
}

export default Posts