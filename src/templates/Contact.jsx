import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleContactSection } from '../utilities/navigation';
import { useNav } from '../utilities/NavContext'; 

const Contact = () => {
    // 1. Grab everything from context
    const { 
        translateContact, setTranslateContact, 
        translateWorks, setTranslateWorks, 
        translateAbout, setTranslateAbout 
    } = useNav();

    const restPath = `${restBase}pages/20`;
    const [restData, setData] = useState({});
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    setLoadStatus(true);
                }
            } catch (error) {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
            {isLoaded && restData && restData.acf ? (
                // 2. This class is what handles the sliding animation
                <section id='contact' className={`section ${translateContact ? 'translate-up' : ''}`}>
                    <nav className="site-navigation">
                        <button 
                            aria-label='Contact Button' 
                            id='contact-btn' 
                            // 3. Check the order of these arguments!
                            onClick={() => toggleContactSection(
                                setTranslateContact, 
                                translateContact, 
                                translateWorks, 
                                setTranslateWorks, 
                                translateAbout, 
                                setTranslateAbout
                            )}
                        >
                            <h2 className='section-title'>{restData.title.rendered}</h2>
                        </button>
                    </nav>
                    <article className='contact-wrapper'>
                        <h3 className='contact-heading'>let's be frandz:</h3>
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
                    </article>
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Contact;