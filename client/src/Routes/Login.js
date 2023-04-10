import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login(){

    return(
        <div className="login-card">
            <form>
                <input className="username" type="text" placeholder="Username" />
                <input type="password" className="password" placeholder="Password" />
                <button className="login-btn">Login</button>
            </form>
        </div>
    )
}

export default Login;