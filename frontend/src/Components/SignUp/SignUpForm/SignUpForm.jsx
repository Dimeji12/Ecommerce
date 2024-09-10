import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShowHidePassword from '../../Shared/MiniComponents/ShowHidePassword/ShowHidePassword';
import s from './SignUpForm.module.scss';
import axios from 'axios';
import { apiUrl } from '../../../Data/BaseApi';

const SignUpForm = () =>
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve redirect URL from query parameters
  const query = new URLSearchParams(location.search);
  const redirectUrl = decodeURIComponent(query.get("redirect")) || "/"; // Default to home page if no redirect URL
  console.log('SignUp redirect URL:', redirectUrl); // Debugging

  const handleEmailChange = (value) =>
  {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (value) =>
  {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const validateEmail = (value) =>
  {
    if (!value)
    {
      return 'Email is required';
    }
    return '';
  };

  const validatePassword = (value) =>
  {
    if (!value)
    {
      return 'Password is required';
    }
    return '';
  };

  const signUp = async (e) =>
  {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!emailError && !passwordError)
    {
      const data = {
        Email: email,
        Password: password
      };

      const url = `${apiUrl}account/register`;

      try
      {
        await axios.post(url, data);
        console.log('SignUp successful, navigating to:', redirectUrl); // Debugging
        navigate(redirectUrl);
      } catch (error)
      {
        if (error.response && error.response.data)
        {
          const errorMessage = error.response.data[0]?.description || 'Registration failed.';
          alert(`Failed: ${errorMessage}`);
        } else
        {
          alert('Failed to register. Please try again.');
        }
      }
    }
  };

  return (
    <form method="POST" className={s.form} onSubmit={signUp}>
      <h2>Create an Account</h2>
      <p>Enter Your Details Below</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email address"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          required
          aria-required="true"
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <div className={s.input}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            required
            aria-required="true"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <ShowHidePassword />
        </div>
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.createAccBtn}>
          Create Account
        </button>

        <p>
          <span>Already have an Account</span>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
