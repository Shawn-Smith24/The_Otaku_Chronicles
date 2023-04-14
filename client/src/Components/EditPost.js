import { useState } from "react";
import "./Posts.css";


function EditPost({onClick}) {
    // const {id} = post;

    // const handleSubjectChange = (e) => {
    //     setUpdatedPosts({ ...updatedPosts, subject: e.target.value });

    // };
    // const handleTextChange = (e) => {
    //     setUpdatedPosts({ ...updatedPosts, text: e.target.value });
    // };
    // const handleUsernameChange = (e) => {
    //     setUpdatedPosts({ ...updatedPosts, username: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`/posts/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(updatedPosts),
    //     })
    //         .then((r) => r.json())
    //         .then((updatedPosts) => {
    //             const updatedPostsArray = post.map((post) => {
    //                 if (post.id === updatedPosts.id) {
    //                     return updatedPosts;
    //                 } else {
    //                     return post;
    //                 }
    //             });
    //             setUpdatedPosts(updatedPostsArray);
    //         });
    // };

    return (
        <div>
           <button onClick={onClick}>Edit</button>
        </div>
    )
}

export default EditPost;