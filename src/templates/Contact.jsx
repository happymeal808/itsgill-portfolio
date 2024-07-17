import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleContactSection } from '../utilities/navigation';

const Contact = ({ translateContact, setTranslateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout }) => {
    const restPath = `${restBase}pages/20`;
    const [restData, setData] = useState({});
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data fetched:', data); // Debugging log
                    setData(data);
                    setLoadStatus(true);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                    setLoadStatus(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
            {isLoaded && restData && restData.acf ? (
                <section id='contact' className={`section ${translateContact ? 'translate-up' : ''}`}>
                    <nav className="site-navigation">
                        <button id='contact-btn' onClick={() => toggleContactSection(setTranslateContact, translateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout)}>
                            <h2 className='section-title'>{restData.title.rendered}</h2>
                        </button>
                    </nav>
                    <ul className='contact-links'>
                        {restData.acf.email && (
                            <li><a className='email' href={`mailto:${restData.acf.email}`} target="_blank" rel="noopener noreferrer">Email</a></li>
                        )}
                        {restData.acf.linkedin && (
                            <li><a className='linkedin' href={restData.acf.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        )}
                        {restData.acf.github && (
                            <li><a className='github' href={restData.acf.github} target="_blank" rel="noopener noreferrer">Github</a></li>
                        )}
                    </ul>
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Contact;