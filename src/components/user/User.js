import React from 'react';
import Avatar from './Avatar';

/**
 * user is the object containing user info, like name, email etc
 */
export default ({isLoggedUser = false, setIsVisible, user}) => {
  return <div className="user">
    {
    !isLoggedUser &&
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
  {isLoggedUser && <p>Hi {user.name}</p>}
    </div>
  </div>
}
