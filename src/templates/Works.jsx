import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import Post from './Post';
import { useNav } from '../utilities/NavContext';
import { restBase } from '../utilities/Utilities';

const Works = () => {
  const { translateWorks } = useNav(); 
  const [selectedWork, setSelectedWork] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [transitionClass, setTransitionClass] = useState('fade-in show');
  
  // 1. New State for the "Works" Page Title (to match Contact.jsx)
  const [pageData, setPageData] = useState(null);

  // 2. Fetch the "Works" Page data
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${restBase}pages/16`); // Ensure 16 is your Works Page ID
        if (response.ok) {
          const data = await response.json();
          setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching Works page title:", error);
      }
    };
    fetchPageData();
  }, []);

  // 3. Define the title to pass down
  const worksTitle = pageData?.title?.rendered || "Works";

  const handleSelectWork = (slug) => {
    setLoading(true);
    setTransitionClass('fade-out hide');
    setTimeout(() => {
      setSelectedWork(slug);
      setTransitionClass('fade-in show');
      setLoading(false);
    }, 200); 
  };

  const handleBack = () => {
    setLoading(true);
    setTransitionClass('fade-out hide');
    setTimeout(() => {
      setSelectedWork(null);
      setTransitionClass('fade-in show');
      setLoading(false);
    }, 200);
  };

  // 4. Return
  return (
    <>
      {selectedWork ? (
        <Post
          slug={selectedWork}
          onBack={handleBack}
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle} // Pass the dynamic title
          setLoading={setLoading}
          id="works"
          translateWorks={translateWorks}
          transitionClass={transitionClass}
        />
      ) : (
        <Posts
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle}
          setLoading={setLoading}
          id="works"
          translateWorks={translateWorks}
          transitionClass={transitionClass}
        />
      )}
    </>
  );
};

export default Works;