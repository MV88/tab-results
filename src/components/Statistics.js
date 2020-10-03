import React from 'react';
import max from 'lodash/max';
import round from 'lodash/round';
import PR from './PR';

export default ({
  results,
  className = "statistics",
} = {}) => {
  const numWin = results.filter(({type}) => type === "W").length;
  const percWin = numWin / results.length;
  const numLosses = results.length - numWin;
  const pr = max(results.filter(({score}) => score)) || {score: 0};
  return (
  <div className={className}>
    <h4>#wins: {numWin}, {percWin * 100}%</h4>
    <h4>#losses: {numLosses}, {round((1 - (percWin)) * 100)}%</h4>
    <PR pr={pr.score}/>

  </div>);
}