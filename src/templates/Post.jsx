import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';

const Post = ({ slug, onBack, onSelectWork, worksTitle }) => {
  const restPath = restBase + `posts?slug=${slug}&_embed=true`;
  const [restData, setData] = useState(null);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setData(data[0]);
          setLoadStatus(true);
        } else {
          setLoadStatus(false);
        }
      } catch (error) {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);
  

  // format date to F Y
  const formatDate = (dateString) => {
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
  };

  return (
    <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
      {isLoaded && restData ? (
        <>
          <h1>{worksTitle}</h1>
          <button onClick={onBack}>Back to Works</button>
          <section id={`post-${restData.id}`}>
   
            
            {/* work title */}
            {restData.acf.works_title && <h2>{restData.acf.works_title}</h2>}

                        {/* Work images */}
                        {Array.isArray(restData.acf.screen_captures) && restData.acf.screen_captures.length > 0 ? (
              <div className="work-gallery">
                <ul>
                  {restData.acf.screen_captures.map((image, index) => (
                    <li key={index}>
                      <img src={image.url} alt={image.alt || `Screen capture ${index + 1}`} />
                      {image.caption && <p>{image.caption}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No screen captures available.</p>
            )}
            {/* work types */}
            <div className="work-type">
              <ul>
                {restData.acf.works_type.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
            {restData.acf.date_complete && <p>{formatDate(restData.acf.date_complete)}</p>}
            {restData.acf.project_description && <p>{restData.acf.project_description}</p>}
            {restData.acf.reflection && <p>{restData.acf.reflection}</p>}
            {restData.acf.live_site && (
              <a href={restData.acf.live_site} target="_blank" rel="noopener noreferrer">
                {restData.acf.live_site}
              </a>
            )}
            {restData.acf.github_repo && (
              <a href={restData.acf.github_repo} target="_blank" rel="noopener noreferrer">
                {restData.acf.github_repo}
              </a>
            )}
          </section>
          <nav className="posts-navigation">
            {restData.previous_post && restData.previous_post.id && (
              <button onClick={() => onSelectWork(restData.previous_post.slug)} className="prev-post">
                {restData.previous_post.title}
              </button>
            )}
            {restData.next_post && restData.next_post.id && (
              <button onClick={() => onSelectWork(restData.next_post.slug)} className="next-post">
                {restData.next_post.title}
              </button>
            )}
          </nav>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Post;