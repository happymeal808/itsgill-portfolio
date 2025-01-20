import React, { useState, useEffect } from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
import { applyTheme, toggleTheme, getPreferredTheme } from '../utilities/theme';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button onClick={() => toggleTheme(theme, setTheme)} id='theme-toggle-btn' aria-label='Theme Toggle'>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;