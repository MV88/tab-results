import React from 'react';
import max from 'lodash/max';

export default ({
  className = "pr-score",
  scores = [1, 5 , 1515, 153],
} = {}) => {
  const pr = max(scores)
  return (
  <div className={className}>
    <h4>PR is {pr}</h4>
  </div>);
}
