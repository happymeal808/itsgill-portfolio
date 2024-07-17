import React, { useState, useEffect } from 'react';
import { restBase, featuredImage } from '../utilities/Utilities';
import { toggleWorksSection } from '../utilities/navigation';

const Posts = ({ onSelectWork, worksTitle, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout, translateContact, setTranslateContact }) => {
  const restPath = `${restBase}posts?_embed=true`;
  const metadataPath = `${restBase}pages?slug=works`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, metadataResponse] = await Promise.all([
          fetch(restPath),
          fetch(metadataPath)
        ]);

        if (postsResponse.ok && metadataResponse.ok) {
          const postsData = await postsResponse.json();
          const metadataData = await metadataResponse.json();

          setData(postsData);
          setLoadStatus(true);
        } else {
          setLoadStatus(false);
        }
      } catch (error) {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath, metadataPath]);

  return (
    <div>
      {isLoaded && restData.length > 0 && (
        <section id="works" className={translateWorks ? 'translate-up' : ''}>
          <nav className='site-navigation'>
            <button
              id='works-btn'
              onClick={() =>
                toggleWorksSection(
                  setTranslateWorks,
                  translateWorks,
                  setTranslateAbout,
                  translateAbout,
                  setTranslateContact,
                  translateContact
                )
              }
            >
              <h2 className='section-title'>{worksTitle}</h2>
            </button>
          </nav>
          <nav className='works-navigation'>
            <ul className={`entry-content fade-in ${isLoaded ? 'show' : ''}`}>
              {restData.map(post => (
                <li key={post.id} id={`post-${post.id}`}>
                  <div className="item-wrapper">
                    <button className='works-btn' onClick={() => onSelectWork(post.slug)}>
                      <h3 className='work-title'>{post.title.rendered}</h3>
                    </button>
                    {post.featured_media !== 0 && post._embedded && (
                      <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </div>
  );
};

export default Posts;