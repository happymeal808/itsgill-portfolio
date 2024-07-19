import React, { useState, useEffect } from 'react';
import Home from './templates/Home';
import About from './templates/About';
import Works from './templates/Works';
import Contact from './templates/Contact';
import { restBase } from './utilities/Utilities';

function App() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [worksTitle, setWorksTitle] = useState('');
  const [translateWorks, setTranslateWorks] = useState(false);
  const [translateAbout, setTranslateAbout] = useState(false);
  const [translateContact, setTranslateContact] = useState(false);

  useEffect(() => {
    // Fetch the title of the works page
    const fetchWorksTitle = async () => {
      const response = await fetch(`${restBase}pages?slug=works`); // Adjust the slug as needed
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setWorksTitle(data[0].title.rendered);
        }
      }
    };
    fetchWorksTitle();
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;