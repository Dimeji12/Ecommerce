import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showAlert } from "src/Features/globalSlice";
import { setLoginData } from "src/Features/userSlice";
import useOnlineStatus from "src/Hooks/Helper/useOnlineStatus";
import ShowHidePassword from "../../Shared/MiniComponents/ShowHidePassword/ShowHidePassword";
import s from "./LogInForm.module.scss";
import { apiUrl } from "../../../Data/BaseApi";

const LogInForm = () =>
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isWebsiteOnline = useOnlineStatus();

  // Retrieve redirect URL from query parameters
  const query = new URLSearchParams(location.search);
  const redirectUrl = decodeURIComponent(query.get("redirect")) || "/"; // Default to home page if no redirect URL
  console.log('LogIn redirect URL:', redirectUrl); // Debugging

  const handleEmailChange = (value) =>
  {
    setEmail(value);
  };

  const handlePasswordChange = (value) =>
  {
    setPassword(value);
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

  const login = async (event) =>
  {
    event.preventDefault();

    // Validate email and password inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError)
    {
      console.error("Validation failed:", { emailError, passwordError });
      return;
    }

    if (!isWebsiteOnline)
    {
      dispatch(showAlert({ alertText: "No internet connection", alertState: "error" }));
      return;
    }

    try
    {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${apiUrl}account/login`, {
        email,
        password,
      });

      // Extract the user data and JWT token from the response
      const { token, username, address } = response.data;

      // Store the token in sessionStorage
      sessionStorage.setItem('token', token);

      // Dispatch the setLoginData action to update the Redux state with user information
      dispatch(setLoginData({ username, emailOrPhone: email, password, address }));

      // Navigate to the intended page after successful login
      console.log('Login successful, navigating to:', redirectUrl); // Debugging
      navigate(redirectUrl, { replace: true });

      // Display login success alert
      dispatch(showAlert({ alertText: "Login successful", alertState: "success" }));

    } catch (error)
    {
      // Log the error and show feedback to the user
      console.error("Login failed:", error.response?.data || error.message);
      dispatch(showAlert({ alertText: "Login failed. Please check your credentials and try again.", alertState: "error" }));
    }
  };

  return (
    <form className={s.form} onSubmit={login}>
      <h2>Login</h2>
      <p>Enter Your Details Below</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          aria-required="true"
        />
        <div className={s.input}>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            aria-required="true"
          />
          <ShowHidePassword />
        </div>
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.loginBtn}>
          Login
        </button>
        <a href="#">Forgot Password</a>
      </div>
    </form>
  );
};

export default LogInForm;
