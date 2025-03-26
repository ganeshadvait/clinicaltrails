import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__content grid">
        <div className="login__box">
          <input
            type="text"
            id="email"
            required
            placeholder=" "
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="login__label">Name</label>
          <i className="ri-mail-fill login__icon"></i>
        </div>

        <div className="login__box">
          <input
            type="tel"
            id="password"
            required
            placeholder=" "
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="tel" className="login__label">Number </label>
          <i className="ri-eye-off-fill login__icon login__password" id="loginPassword"></i>
        </div>
      </div>

      <button type="submit" className="login__button">Contact now</button>
    </form>
  );
};

export default LoginForm;