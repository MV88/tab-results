import React, {useEffect, useState} from 'react';

import './App.css';
import Table from './components/Table';
import Twitch from './components/Twitch';
import Statistics from './components/Statistics';
import User from './components/user/User';
import RegisterForm from './components/user/RegisterForm';
import AddResult from './components/AddResult';
import {getResults} from './API/service';
import Modal from './components/Modal';


function App() {
  const [results, setResults] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
    const resPromise = await getResults();
    const {results} = await resPromise.json();
    if (results){
      setResults(results);
    } 
  }
  fetchData();
}, [])
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
          <h1> TAB Results</h1>
          <Table rows={results}/>
          <Statistics/>
          <AddResult
            setResults={setResults}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
