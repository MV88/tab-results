import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Twitch from './Twitch';

export default ({
  isDarkMode,
  setDarkMode
}) => {
 
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  return <div className="dark-mode">
      <Twitch/>
      <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={32}
    />
      </div>;
    }