import axios from 'axios';
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import {END_POINT} from "./index"




const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      const { data } = await axios.post(
        `${END_POINT}/user/register`,
        { userName, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(data.success!==false){
        toast.success(data.data)
        
      }else{
        toast.error(`${data.error}`);
        
      } 


    } catch (errorr : any) {
      const {error} = JSON.parse(errorr.response?.request?.responseText)
      toast.error(`${error}`);
      console.log(error);

    }
  };
  
  return (
    <>
      <div>Register</div>
      <form onSubmit={registerHandler}>
        <input type="text" placeholder='Enter Your Name' required value={userName as string} onChange={(e) => setUserName(e.target.value)} />
        <input type="email" placeholder='Enter Your Email' required value={email as string} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" id="password" required placeholder='Enter Password' value={password as string} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        <Link to={"/login"}> login</Link>
      </form>
    </>
  )
}

export default Register