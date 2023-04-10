import React, { useState } from 'react';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Here you can add your login logic
        fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    }
    )
  }

  return (
    <form onSubmit={handleSubmit} className='login-card'>
      <div>
        <label htmlFor="email" >Email:</label>
        <input 
        className='email'
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
        className='password'
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button className="login-btn" type="submit" onSubmit={handleSubmit}>Log in</button>
    </form>
  );
}

export default Login;
