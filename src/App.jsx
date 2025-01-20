import React, { useState, useEffect } from 'react';
import Home from './templates/Home';
import About from './templates/About';
import Works from './templates/Works';
import Contact from './templates/Contact';
import Loading from './templates/Loading'; // Import the Loading component
import { restBase } from './utilities/Utilities';

function App() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [worksTitle, setWorksTitle] = useState('');
  const [translateWorks, setTranslateWorks] = useState(false);
  const [translateAbout, setTranslateAbout] = useState(false);
  const [translateContact, setTranslateContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const loadAllImages = () =>
    new Promise((resolve) => {
      const images = Array.from(document.images); 
      let loadedCount = 0;

      const checkIfAllLoaded = () => {
        loadedCount += 1;
        if (loadedCount === images.length) resolve();
      };

      images.forEach((img) => {
        if (img.complete) {
          checkIfAllLoaded();
        } else {
          img.onload = checkIfAllLoaded;
          img.onerror = checkIfAllLoaded; 
        }
      });

      if (images.length === 0) resolve(); 
    });

  useEffect(() => {
    const initializeApp = async () => {
      const minimumLoadingTime = new Promise((resolve) => setTimeout(resolve, 1150));
      const resourceLoading = new Promise((resolve) => setTimeout(resolve, 750));

      try {
        await Promise.all([minimumLoadingTime, resourceLoading]);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    initializeApp();

    const fetchTitle = async () => {
      const response = await fetch(`${restBase}pages?slug=works`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                setWorksTitle(data[0].title.rendered); // Local state in Works
            }
        }
    };
    fetchTitle();
  }, []);

  if (isLoading) {
    return <Loading fadeOut={fadeOut} />; 
  }

  return (
    <main id="main">
      <Home 
        translateWorks={translateWorks} 
        setTranslateWorks={setTranslateWorks} 
        translateAbout={translateAbout}
        setTranslateAbout={setTranslateAbout}
        translateContact={translateContact}
        setTranslateContact={setTranslateContact}
      />
      <Works 
        selectedWork={selectedWork}
        setSelectedWork={setSelectedWork}
        worksTitle={worksTitle}
        translateWorks={translateWorks} 
        setTranslateWorks={setTranslateWorks} 
        translateAbout={translateAbout}
        setTranslateAbout={setTranslateAbout}
        translateContact={translateContact}
        setTranslateContact={setTranslateContact}
      />
      <About 
        translateAbout={translateAbout} 
        setTranslateAbout={setTranslateAbout} 
        translateWorks={translateWorks} 
        setTranslateWorks={setTranslateWorks}
        translateContact={translateContact}
        setTranslateContact={setTranslateContact}
      />
      <Contact 
        translateContact={translateContact} 
        setTranslateContact={setTranslateContact}
        translateWorks={translateWorks} 
        setTranslateWorks={setTranslateWorks} 
        translateAbout={translateAbout}
        setTranslateAbout={setTranslateAbout}
      />
    </main>
  );
}

export default App;
