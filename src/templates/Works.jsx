import React, { useState } from 'react';
import Posts from './Posts';
import Post from './Post';
import { useNav } from '../utilities/NavContext';

const Works = ({ worksTitle }) => {
  const { translateWorks } = useNav(); 
  const [selectedWork, setSelectedWork] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [transitionClass, setTransitionClass] = useState('fade-in show');

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

  return (
    <>
      {selectedWork ? (
        <Post
          slug={selectedWork}
          onBack={handleBack}
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle}
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