import React, { useState, useEffect } from 'react';
import { restBase, featuredImage } from '../utilities/Utilities';
import { toggleWorksSection } from '../utilities/navigation';
import { useNav } from '../utilities/NavContext';

const Posts = ({ onSelectWork, worksTitle, setLoading, translateWorks, transitionClass }) => {
  const { 
    setTranslateWorks, 
    setTranslateAbout, translateAbout, 
    setTranslateContact, translateContact 
  } = useNav();

  const restPath = `${restBase}posts?_embed=true`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const postsData = await response.json();
          setData(postsData);
          setLoadStatus(true);
        }
      } catch (error) {
        console.error("Fetch error", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [restPath, setLoading]);

  return (
    // The ID "works" is back on the section where SCSS expects it
    <section 
      id="works" 
      className={`${transitionClass} ${translateWorks ? 'translate-up' : ''}`}
    >
      <nav className='site-navigation'>
        <button
          aria-label='Works Button'
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
        <ul className='entry-content'>
          {restData.map(post => (
            <li key={post.id} id={`post-${post.id}`}>
              <div className="item-wrapper">
                <button aria-label='Single Works Button' className='works-btn' onClick={() => onSelectWork(post.slug)}>
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
  );
};

export default Posts;