import React from 'react';

export default () => {
  return <div className="intro">
    <h2>What is app for?</h2>
    <p>The main idea is to connect twitch chat with this web application.</p><p> <strong>The goal</strong> is to store the results of survival games in a database where can be used to perform different actions and create various features
    </p>
    <h3>Here some examples</h3>
    <table>
      <thead>
      <tr>
        <th>Command</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>!addscore 394084 W</td>
          <td>to add a record in the database</td>
        </tr>
        <tr>
          <td>!pr</td>
          <td>to get personal record</td>
        </tr>
        <tr>
          <td>!avgWin</td>
          <td>to show average score of win games</td>
        </tr>
        <tr>
          <td>!chartWins</td>
          <td>to get the image of the wins in a chart</td>
        </tr>
      </tbody>
    </table>
  </div>
}