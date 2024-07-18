import React, { useState, useEffect, useMemo } from 'react';
import { toggleWorksSection } from '../utilities/navigation';
import { restBase, featuredImage } from '../utilities/Utilities';

const Post = ({
  slug,
  onBack,
  onSelectWork,
  worksTitle,
  translateWorks,
  setTranslateWorks,
  translateAbout,
  setTranslateAbout,
  translateContact,
  setTranslateContact,
}) => {
  const restPath = useMemo(() => `${restBase}posts?slug=${slug}&_embed=true`, [slug]);
  const [restData, setData] = useState(null);
  const [isLoaded, setLoadStatus] = useState(false);
  const [screenCaptures, setScreenCaptures] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoadStatus(false);
      setScreenCaptures([]); // Reset screen captures when slug changes
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          const postData = data[0];
          setData(postData);

          if (postData.acf.screen_captures && postData.acf.screen_captures.length > 0) {
            const captures = await Promise.all(
              postData.acf.screen_captures.map(async (id) => {
                const mediaResponse = await fetch(`${restBase}media/${id}`);
                if (mediaResponse.ok) {
                  return mediaResponse.json();
                } else {
                  console.error(`Failed to fetch media with ID ${id}`);
                  return null;
                }
              })
            );
            setScreenCaptures(captures.filter(capture => capture !== null));
          }
          setLoadStatus(true);
        } else {
          console.error('Failed to fetch data:', response.statusText);
          setLoadStatus(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  useEffect(() => {
    if (screenCaptures.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % screenCaptures.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [screenCaptures.length]);

  const formatDate = useMemo(() => (dateString) => {
    if (!dateString) return '';
    const year = dateString.slice(0, 4);
    const monthIndex = dateString.slice(4, 6);
    const date = new Date(`${year}-${monthIndex}-01`);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date format: ${dateString}`);
      return 'Invalid Date';
    }
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }, []);

  const hasPrevPost = restData?.previous_post?.id;
  const hasNextPost = restData?.next_post?.id;

  return (
    <div>
      {isLoaded && restData && (
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
          <div className={`section-content fade-in ${isLoaded ? 'show' : ''}`}>
            <button aria-label='Back to Works Archive' className='back-to-archive' onClick={onBack}>
              <svg aria-label="Back Arrow Icon" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
                <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
              </svg>
            </button>
            {restData.acf.works_title && <h2>{restData.acf.works_title}</h2>}
            <div className="content-wrapper">
              {screenCaptures.length > 0 && (
                <div className="work-gallery">
                  <ul>
                    {screenCaptures.map((image, index) => (
                      <li key={index} className={index === currentImageIndex ? 'active' : ''}>
                        {image.source_url ? (
                          <>
                            <img src={image.source_url} alt={image.alt_text || `Screen capture ${index + 1}`} />
                            {image.caption && <p>{image.caption.rendered}</p>}
                          </>
                        ) : (
                          <p>No image URL available</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="work-info">
                <div className="work-type">
                  <ul>
                    {restData.acf.works_type.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                </div>
                {restData.acf.date_complete && <p className='work-date'>{formatDate(restData.acf.date_complete)}</p>}
                {restData.acf.project_description && <p className='work-desc'>{restData.acf.project_description}</p>}
                {restData.acf.reflection && <p className='work-reflect'>{restData.acf.reflection}</p>}
                <div className='project-links'>
                  {restData.acf.live_site && (
                    <a className='live-site-link' href={restData.acf.live_site} target="_blank" rel="noopener noreferrer">
                      <svg className='site-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="Live Site Icon" fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                      </svg>
                    </a>
                  )}
                  {restData.acf.github_repo && (
                    <a className='github-link' href={restData.acf.github_repo} target="_blank" rel="noopener noreferrer">
                      <svg className='site-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="Github Icon" fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <nav className={`posts-navigation ${!hasNextPost ? 'no-next' : ''}`}>
              {hasNextPost && (
                <button onClick={() => onSelectWork(restData.next_post.slug)} className="prev-post">
                  <svg aria-label="Previous Work Arrow Button" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
                    <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
                  </svg>
                </button>
              )}
              {hasPrevPost && (
                <button onClick={() => onSelectWork(restData.previous_post.slug)} className="next-post">
                  <svg aria-label="Next Work Arrow Icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                  </svg>
                </button>
              )}
            </nav>
          </div>
        </section>
      )}
    </div>
  );
};

export default Post;