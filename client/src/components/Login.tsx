import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ userName: '', password: '' });

  const [loggedIn, setLoggedIn] = useState(false);
  
  const authToken = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];
 
  useEffect(() => {
    if (authToken) {
      axios.get("https://auth-jwt-jxtm.vercel.app/user/verify", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        withCredentials: true,
      })
        .then(data => {
          console.log(data);
          
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [authToken, history]);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://auth-jwt-jxtm.vercel.app/user/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      if (data.success === false) {
        toast.error(`${data.error}`);
      } else {
        setLoggedIn(true);
        toast.success(`${data.data}`);
        document.location = "/post";
      }
    } catch (error : any) {
      const { error: errorMessage } = JSON.parse(error.response.request.responseText);
      toast.error(`${errorMessage}`);
    }
  };

  return (
    <>
      <div>Login Here</div>
      <form onSubmit={loginHandler}>
        <input type="text" placeholder='Enter Your Name' required value={credentials.userName} onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })} />
        <input type="password" name="password" id="password" required placeholder='Enter Password' value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        <button type="submit">Login</button>
        <Link to={"/register"}>Register</Link>
        {loggedIn && (
          <h1>Logged in</h1>
        )}
      </form>
    </>
  );
};

export default Login;
