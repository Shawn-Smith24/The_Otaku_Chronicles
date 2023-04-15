import { useState } from "react";



function EditPost({onClick}) {
   

    return (
        <div>
           <button onClick={onClick}>Edit</button>
        </div>
    )
}

export default EditPost;