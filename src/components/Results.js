import React from 'react';
import Row from './Row';

export default ({rows}) => {

  return <div className="table-container">
    <table>
      <thead>
      <tr>
        <th>W/L</th>
        <th>Score</th>
        <th>Day:Hour</th>
        <th>Population</th>
        <th>Colonies Infected</th>
        <th>Soldiers Dead</th>
        <th>Map</th>
        <th>Difficulty</th>
      </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => <Row {...row} key={i}/>)}
      </tbody>
    </table>    
  </div>
}