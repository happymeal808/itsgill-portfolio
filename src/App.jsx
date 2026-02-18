import React, { useState, useEffect } from 'react';
import Home from './templates/Home';
import About from './templates/About';
import Works from './templates/Works';
import Contact from './templates/Contact';
import Loading from './templates/Loading';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      // 1. Show the logo for 4.5 seconds (4s draw + 0.5s beat)
      const showLogoTimer = setTimeout(() => {
          setFadeOut(true); 
  
          // 2. Wait for the exit transition (1.5s total)
          // SVG fades (0.5s) + Background waits, then fades (1.0s)
          const removeLoaderTimer = setTimeout(() => {
              setIsLoading(false);
          }, 1500); 
  
          return () => clearTimeout(removeLoaderTimer);
      }, 4500); 
  
      return () => clearTimeout(showLogoTimer);
    }, []);

    return (
        <>
            {isLoading && <Loading fadeOut={fadeOut} />}

            {/* Content stays mounted in the background so it's ready when loader fades */}
            <main id="main">
                <Home />
                <Works />
                <About />
                <Contact />
            </main>
        </>
    );
}

export default App;