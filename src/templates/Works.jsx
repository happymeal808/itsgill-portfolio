import React, { useState } from 'react';
import Posts from './Posts';
import Post from './Post';

const Works = ({ worksTitle }) => {
  const [translateWorks, setTranslateWorks] = useState(false);
  const [translateAbout, setTranslateAbout] = useState(false);
  const [translateContact, setTranslateContact] = useState(false);
  const [selectedPostSlug, setSelectedPostSlug] = useState(null);

  const handleSelectWork = (slug) => {
    setSelectedPostSlug(slug);
    setTranslateWorks(true);
  };

  const handleBack = () => {
    setSelectedPostSlug(null);
    setTranslateWorks(false);
  };

  return (
    <div>
      {selectedPostSlug ? (
        <Post
          slug={selectedPostSlug}
          onBack={handleBack}
          onSelectWork={handleSelectWork}
          worksTitle={worksTitle}
          translateWorks={translateWorks}
          setTranslateWorks={setTranslateWorks}
          translateAbout={translateAbout}
          setTranslateAbout={setTranslateAbout}
          translateContact={translateContact}
          setTranslateContact={setTranslateContact}
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
        />
      )}
    </div>
  );
};

export default Works;