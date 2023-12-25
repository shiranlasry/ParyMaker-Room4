// RegistrationForm component

import { SetStateAction, useState } from 'react';
import './register.scss';
import NavBar from '../../components/navBar/NavBar';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  };

  const handleRegistration = (e: { preventDefault: () => void; }) => {
    e.preventDefault();


    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);
  };

  return (
    <div className="container-main">
      <NavBar />
      <h1>Registration</h1>
      <form onSubmit={handleRegistration}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
