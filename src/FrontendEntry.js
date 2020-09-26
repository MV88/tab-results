import React, {useEffect, useState} from 'react';

import './App.css';
import Results from './components/Results';
import Twitch from './components/Twitch';
import Statistics from './components/Statistics';
import User from './components/user/User';
import RegisterForm from './components/user/RegisterForm';
import AddResult from './components/AddResult';
import {getUserResults} from './API/service';
import Modal from './components/Modal';
import Intro from './components/Intro';


function App() {
  const [results, setResults] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      async function fetchData() {
      const {data: {
        results
      }} = await getUserResults(loggedUser);
      if (results){
        setResults(results);
      }
    }
    fetchData();
  }
}, [loggedUser])
  return (
    <div className="tab">
      <div className="container">
        <div className="header">
          <Twitch/>
          <User
            loggedUser={loggedUser}
            setIsVisible={setIsVisible}
            setLoggedUser={setLoggedUser}
            isVisible={isVisible}
          />
          <Modal
            contentComponent={
              <RegisterForm
              setLoggedUser={setLoggedUser}
              setIsVisible={setIsVisible}
            />}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        </div>
        <div className="body">
          <img className="tab-banner" alt="tab-banner" src="http://www.numantiangames.com/wp-content/uploads/LogoTheyAreBillions540.gif" />
          {
            loggedUser ? <>
            <h1> TAB Results</h1>
              <Results rows={results}/>
              <Statistics/>
              <AddResult
                setResults={setResults}
                loggedUser={loggedUser}
               />
            </>
            : <Intro/>
              
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
