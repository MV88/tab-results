import React, {useEffect, useState} from 'react';

import './App.css';
import LineChart from './components/LineChart';
import Results from './components/Results';
import Twitch from './components/Twitch';
import Statistics from './components/Statistics';
import User from './components/user/User';
import RegisterForm from './components/user/RegisterForm';
import AddResult from './components/AddResult';
import {getUserResults} from './API/service';
import Modal from './components/Modal';
import DarkMode from './components/DarkMode';
import Intro from './components/Intro';
import { isLoggedIn } from './utils/UserUtils';


function App() {
  const [results, setResults] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    if (isLoggedIn(loggedUser)) {
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
    <div className={`tab ${isDarkMode ? "dark": ""}`}>
      <div className="container">
        <div className="header">
          <DarkMode isDarkMode={isDarkMode} setDarkMode={setDarkMode}/>
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
            isLoggedIn(loggedUser) ? <>
            <h1> TAB Results</h1>
              <Results rows={results}/>
              <Statistics results={results}/>
              <LineChart results={results}/>

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
