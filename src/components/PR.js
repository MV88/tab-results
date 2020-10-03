import React from 'react';

export default ({
  pr,
  className = "pr-score",
} = {}) => {
  return (
  <div className={className}>
    <h4>PR is {pr}</h4>
  </div>);
}
