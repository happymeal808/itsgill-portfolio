import React, { useState } from 'react';
import Posts from './Posts';
import Post from './Post';

const Works = ({ worksTitle, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout, translateContact, setTranslateContact }) => {
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
    }, 200); // Duration should match the CSS transition duration
  };

  const handleBack = () => {
    setLoading(true);
    setTransitionClass('fade-out hide');
    setTimeout(() => {
      setSelectedWork(null);
      setTransitionClass('fade-in show');
      setLoading(false);
    }, 200); // Duration should match the CSS transition duration
  };

  return (
    <div className={`background-works ${transitionClass}`}>
      {selectedWork ? (
        <Post
          slug={selectedWork}
          onBack={handleBack}
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle}
          translateWorks={translateWorks}
          setTranslateWorks={setTranslateWorks}
          translateAbout={translateAbout}
          setTranslateAbout={setTranslateAbout}
          translateContact={translateContact}
          setTranslateContact={setTranslateContact}
          setLoading={setLoading}
        />
      ) : (
        <Posts
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle}
          translateWorks={translateWorks}
          setTranslateWorks={setTranslateWorks}
          translateAbout={translateAbout}
          setTranslateAbout={setTranslateAbout}
          translateContact={translateContact}
          setTranslateContact={setTranslateContact}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Works;