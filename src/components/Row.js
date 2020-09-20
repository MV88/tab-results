import React from 'react';

export default ({
  type,
  score,
  day,
  hour,
  population,
  colInfected,
  soldDead,
  map,
  difficulty,
} = {}) => {
  return (
  <tr>
    <td>{type || "N.A."}</td>
    <td>{score || "N.A."}</td>
  <td>{`${day}g` || "N.A."} {hour ? `${hour}h` : ""}</td>
    <td>{population || "N.A."}</td>
    <td>{colInfected || "N.A."}</td>
    <td>{soldDead || "N.A."}</td>
    <td>{map || "N.A."}</td>
    <td>{difficulty || "N.A."} %</td>
  </tr>);
}