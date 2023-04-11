import React from "react";
import "./AddPost.css";


function AddPost({setPosts}) {
  return (
    <div>
        <form className="post-form">
            <label htmlFor="Subject">Subject</label>
            <input
                type="text"
                name="Subject"
                id="Subject"
                className="subject"
            />
            <label htmlFor="Text">Text</label>
            <input
                type="text"
                name="Text"
                id="Text"
                className="text"
            />

            <button className="submit">Post</button>
        </form>
    </div>
  );
}

export default AddPost;