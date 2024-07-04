import { useState, useEffect } from 'react';
import { restBase, featuredImage } from '../utilities/Utilities';

const Posts = ({ onSelectWork, worksTitle }) => {
  const restPath = restBase + 'posts?_embed=true';
  const metadataPath = restBase + 'pages?slug=works';
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
    <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
      {isLoaded && restData.length > 0 && (
        <>
          <h1>{worksTitle}</h1>
          {restData.map(post => (
            <section key={post.id} id={`post-${post.id}`}>
              {post.featured_media !== 0 && post._embedded && (
                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
              )}
              <div onClick={() => onSelectWork(post.slug)}>
                <h2>{post.title.rendered}</h2>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;