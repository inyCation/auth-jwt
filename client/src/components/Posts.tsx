import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const Posts: React.FC = () => {
  const [post, setPost] = useState<String>("");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Retrieve the authentication token from the "auth" cookie
      const authToken = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];

      if (!authToken) {
        // Handle the case when the token is not found
        toast.error("Authentication token not found.");
        return;
      }
      
      const { data } = await axios.get("https://auth-jwt-jxtm.vercel.app/user/post", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      if (data.success === false) {
        toast.error(`${data.error}`);
      } else {
        setPost(data.message);
        toast.success(`${data.message}`);
      }
    } catch (error) {
      console.error("API request error:", error);
      toast.error("An error occurred while fetching data.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="getData">GetData</button>
      </form>
      {
        post && (
          <h2>post </h2>
        ) 
      }
    </>
  );
};

export default Posts;
