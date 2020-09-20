import React from 'react';
import PR from './PR';

export default ({
  className = "statistics",
} = {}) => {
  const win = 20
  return (
  <div className={className}>
    <h4>% Win is 20 %</h4>
    <h4>% Lose is {100 - win} %</h4>
    <PR/>

  </div>);
}