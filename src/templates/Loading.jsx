import React, { useEffect } from 'react';

const Loading = ({ fadeOut }) => { // Accept fadeOut as a prop
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.dataset.theme;
      console.log('Theme applied to Loading:', currentTheme);
    };

    // Add event listener for theme change
    window.addEventListener('themechange', handleThemeChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  return (
    <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
      <svg
        className="svg-draw"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path
            className="st0"
            d="M409.6,155.3c-13.8-28.1-33.6-49.9-59.7-65.4c-26.1-15.4-56.4-23.2-91-23.2c-34.6,0-65.8,7.7-93.5,23.2
              c-27.7,15.5-49.5,37.6-65.4,66.4c-15.9,28.8-23.8,62.2-23.8,100s7.9,71.1,23.8,99.6c15.9,28.6,37.7,50.6,65.4,66.1
              c27.7,15.5,58.9,23.2,93.5,23.2c48.4,0,88.2-14.1,119.4-42.2c31.3-28.1,49.5-66.2,54.7-114.2H235.4v-51.2H502v48.4
              c-3.8,39.7-16.6,76-38.4,109c-21.8,33-50.5,59.1-86,78.2C342,492.4,322.6,502,279,502c-46,0-6.3-103.8-44.2-124.8
              c-11.3-6.2-21.2-8.1-33.2-12.1c-14.4-4.9-31.6-14.6-45.3-42.5c-7-14.1-10.6-24.1-18.6-37.6C115.7,247.6,10,285.1,10,238
              s11-71,33.1-108.6c22-37.6,52-66.9,89.9-87.9c37.9-21,79.9-31.5,125.8-31.5c52.6,0,99.2,12.7,139.7,38.1
              c40.5,25.4,70,61.1,88.5,107.3H409.6z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Loading;
