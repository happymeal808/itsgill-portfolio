import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import Resume from '../components/Resume';

const Contact = () => {
    const restPath = `${restBase}pages/20`;
    const [restData, setData] = useState({});
    const [isLoaded, setLoadStatus] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('');

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

    const openModal = (resume) => {
        console.log('Opening modal with resume object:', resume); // Debugging log
        if (resume && resume.url) {
            const fullUrl = `${restBase}${resume.url}`; // Ensure the base URL is included
            console.log('Full Resume URL:', fullUrl); // Debugging log
            setResumeUrl(fullUrl);
            setModalOpen(true);
        } else {
            console.error("Resume URL not found");
        }
    };

    const closeModal = () => {
        console.log('Closing modal'); // Debugging log
        setModalOpen(false);
        setResumeUrl('');
    };

    return (
        <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
            {isLoaded && restData && restData.acf ? (
                <section id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <ul>
                        {restData.acf.email && (
                            <li><a href={`mailto:${restData.acf.email}`} target="_blank" rel="noopener noreferrer">Email</a></li>
                        )}
                        {restData.acf.resume && (
                            <li><button onClick={() => openModal(restData.acf.resume)}>Resume</button></li>
                        )}
                        {restData.acf.linkedin && (
                            <li><a href={restData.acf.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        )}
                        {restData.acf.github && (
                            <li><a href={restData.acf.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        )}
                    </ul>
                </section>
            ) : (
                <p>Loading...</p>
            )}
            {resumeUrl && (
                <Resume
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    resumeUrl={resumeUrl}
                />
            )}
        </div>
    );
}

export default Contact;