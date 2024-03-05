import React from 'react'
import {Link} from "react-router-dom"

const App :React.FC= () => {
  return (
    <div className='userLoginContainer' > 
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">register</Link>
      <br />
      <Link to="/post">post</Link>
    </div>
  )
}

export default App