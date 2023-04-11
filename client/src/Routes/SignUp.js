import React, { useState } from 'react';
import './SignUp.css';


function SignUp({ setUser, users}) {
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <form onSubmit={handleSubmit} className='signup-card'>
      <div>
        <label htmlFor="name">Name:</label>
        <input
            className='name'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
        className='username'
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
        className='email'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
        className='password'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
        className='password'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <button className="signup-btn" type="submit">SignUp</button>
    </form>
  );
}

export default SignUp;
