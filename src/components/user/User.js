import React, {useState} from 'react';
import Avatar from './Avatar';
import { signin } from '../../API/service';

/**
 * user is the object containing user info, like name, email etc
 */


export default ({loggedUser, setIsVisible, setLoggedUser}) => {
  const [loginData, setLoginData] = useState({});
  const loginUser = async () => {
    // send request to get /users
    const {email, password} = loginData;
    if (email && password) {
      const user = await signin(loginData);
      if (user) {
        setLoggedUser(user);
      } else {
      // notification 404

      }
    } else {
      // notification of required data
    }
  };
  return <div className="user">
    {
    !loggedUser &&
    <>
      <div className="inputs">
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            required
            onChange={ e =>
              setLoginData({...loginData, email: e.target.value})
            }/>
        </div>
        <div className="pwd">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={ e => {
              setLoginData({...loginData, password: e.target.value})
            }
            }/>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => loginUser() }>Login</button>    
        <button onClick={() => setIsVisible(true)}>Register</button>    
      </div>

    </> 
    }
    <div className="avatar">
      <Avatar/>
  {loggedUser && <p>Hi {loggedUser?.name}</p>}
    </div>
  </div>
}
