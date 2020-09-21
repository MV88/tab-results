import React from 'react';
import Avatar from './Avatar';


export default ({isLoggedIn = false, setIsVisible}) => {
  return <div className="user">
    {
    !isLoggedIn &&
    <>
      <div className="inputs">
        <div className="pwd">
          <label htmlFor="password">Password</label>
          <input type="text" name="password"/>
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => setIsVisible(true)}>Login</button>    
        <button onClick={() => setIsVisible(true)}>Register</button>    
      </div>

    </> 
    }
    <div className="avatar">
      <Avatar/>
      {isLoggedIn && <p>Logged in</p>}
    </div>
  </div>
}