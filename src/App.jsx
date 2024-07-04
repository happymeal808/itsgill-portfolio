import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Home from './templates/Home';
import About from './templates/About';
import Posts from './templates/Posts';
import Post from './templates/Post';
import Contact from './templates/Contact';
import { restBase } from './utilities/Utilities';

function App() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [worksTitle, setWorksTitle] = useState('');

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
      <header id="masthead" className="site-header">
        <nav className="site-navigation">
          <ul>
            <li><HashLink smooth to="#home">Home</HashLink></li>
            <li><HashLink smooth to="#works">Works</HashLink></li>
            <li><HashLink smooth to="#about">About</HashLink></li>
            <li><HashLink smooth to="#contact">Contact</HashLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <section id="home">
          <Home />
        </section>
        <section id="works">
          {selectedWork ? (
            <Post slug={selectedWork} onBack={() => setSelectedWork(null)} onSelectWork={setSelectedWork} worksTitle={worksTitle} />
          ) : (
            <Posts onSelectWork={setSelectedWork} worksTitle={worksTitle} />
          )}
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}

export default App;