import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleContactSection } from '../utilities/navigation';

const Contact = ({ translateContact, setTranslateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout }) => {
    const [restData, setData] = useState({});
    const [isLoaded, setLoadStatus] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const restPath = `${restBase}pages/20`;
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data fetched:', data);
                setData(data);
                setLoadStatus(true);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoadStatus(false);
            }
        };
        fetchData();
    }, []);

    if (error) return <p>Error loading contact info: {error}</p>;
    if (!restData) return null;

    return (
        <section id='contact' className={`section ${translateContact ? 'translate-up' : ''}`}>
            <nav className="site-navigation">
                <button
                    aria-label='Contact Button'
                    id='contact-btn'
                    onClick={() => toggleContactSection(setTranslateContact, translateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout)}
                >
                    <h2 className='section-title'>{restData?.title?.rendered || "Contact"}</h2>
                </button>
            </nav>
            <article className='contact-wrapper'>
                <h3 className='contact-heading'> let's chit-chat:</h3>
                <ul className='contact-links'>
                    {restData?.acf?.email && (
                        <li>
                            <a className='email' href={`mailto:${restData.acf.email}`} target="_blank" rel="noopener noreferrer">Email</a>
                        </li>
                    )}
                    {restData?.acf?.linkedin && (
                        <li>
                            <a className='linkedin' href={restData.acf.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </li>
                    )}
                    {restData?.acf?.github && (
                        <li>
                            <a className='github' href={restData.acf.github} target="_blank" rel="noopener noreferrer">Github</a>
                        </li>
                    )}
                </ul>
            </article>
        </section>
    );
};

export default Contact;
