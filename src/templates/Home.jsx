import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';

const Home = () => {
    const restPath = restBase + 'pages/14';
    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData();
    }, [restPath]);
    
    return (
        <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
            {isLoaded && restData && (
                <section id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content">
                        <p>{restData.acf.introduction}</p>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home;