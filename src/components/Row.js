import React from 'react';

export default ({
  type,
  score,
  day,
  hour,
  population,
  col_infected,
  sol_dead,
  map,
  difficulty,
} = {}) => {
  return (
  <tr>
    <td>{type || "N.A."}</td>
    <td>{score || "N.A."}</td>
      <td>{day ? (day + "g") : "N.A."} {hour ? `${hour}h` : ""}</td>
    <td>{population || "N.A."}</td>
    <td>{col_infected || "N.A."}</td>
    <td>{sol_dead || "N.A."}</td>
    <td>{map || "N.A."}</td>
    <td>{difficulty || "N.A."} %</td>
  </tr>);
}