import React from 'react';
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan';
import './RegisterForm.css';
import registerBg from '../../assets/register.png';

export default function RegisterForm() {
  const { mutate, data, error, isPending, isSuccess, isError } = useRegisterUserTan();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      address: e.target.address.value,
      mobilenumber: e.target.mobilenumber.value
    };
    mutate(formData);
  };

  return (
    <div className="register-background-container">
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
        <h2>Register</h2>

        {/* Trick browser by adding hidden fake fields */}
        <input type="text" name="fakeUsername" style={{ display: 'none' }} autoComplete="off" />
        <input type="password" name="fakePassword" style={{ display: 'none' }} autoComplete="new-password" />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="new-email"
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          autoComplete="new-username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          autoComplete="new-password"
        />

          <label htmlFor="mobilenumber">Mobile Number</label>
        <input
          type="text"
          name="mobilenumber"
          id="mobilenumber"
          required
         
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          required
         
        />

        

        <button type="submit" className="submit-button" disabled={isPending}>
          {isPending ? 'Registering...' : 'Register'}
        </button>

        {isError && <p className="error">{error.message}</p>}
        {isSuccess && <p className="success">{data.message}</p>}
      </form>

      <img src={registerBg} alt="register" className="register-background-image" />
    </div>
  );
}
