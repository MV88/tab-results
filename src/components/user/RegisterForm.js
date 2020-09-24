import React, {useState} from 'react';
import { signup } from '../../API/service';


export default ({setLoggedUser, setIsVisible}) => {
  const validateData = async (user) => {
    // TODO validate data before send
    if (user.name && user.password && user.email) {
      const loggedUser = await signup(user);
      setLoggedUser(loggedUser);
      setIsVisible(false);
    }
  }
  const [user, setUser] = useState({});
  return <div className="register-user">
    <h3>Register a new account</h3>
    <form className="form" id="form-register-user">
      <div className="data">
        <label htmlFor="email">Email (*)</label>
        <input
          onChange={(e) => {
            setUser({...user, email: e.target.value})
          }}
          required
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="data">
        <label htmlFor="password">Password (*)</label>
        <input
          onChange={(e) => {
            setUser({...user, password: e.target.value})
          }}
          required
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="data">
        <label htmlFor="name">Name (*)</label>
        <input
          onChange={(e) => {
            setUser({...user, name: e.target.value})
          }}
          required
          type="name"
          id="name"
          name="name"
        />
      </div>
    </form>
    <button value="Add" onClick={() => validateData(user, setUser)}>Add</button>

  </div>
}