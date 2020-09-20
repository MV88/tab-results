import React, {useEffect, useState} from 'react';

import './App.css';
import Table from './components/Table';
import Twitch from './components/Twitch';
import Statistics from './components/Statistics';
import AddResult from './components/AddResult';
import {getResults} from './API/service';

function App() {
  const [results, setResults] = useState([]);

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
    <div className="App">
      <div className="container">
      
        <header className="App-header">
          <h1> TAB Results</h1>
          <Table rows={results}/>
          <Twitch/>
          <Statistics/>
          <AddResult/>

        </header>
      </div>
    </div>
  );
}

export default App;
