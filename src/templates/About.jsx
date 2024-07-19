import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleAboutSection } from '../utilities/navigation';

const About = ({ translateAbout, setTranslateAbout, translateWorks, setTranslateWorks, translateContact, setTranslateContact }) => {
    const restPath = restBase + 'pages/18';
    const [restData, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    if (data.acf.portrait) {
                        const portraitResponse = await fetch(`${restBase}media/${data.acf.portrait}`);
                        if (portraitResponse.ok) {
                            const portraitData = await portraitResponse.json();
                            data.acf.portrait = portraitData;
                        } else {
                            console.error('Error fetching portrait image:', portraitResponse.statusText);
                        }
                    }
                    setData(data);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <div className={`fade-in ${restData ? 'show' : ''}`}>
            {restData ? (
                <section id='about' className={`section ${translateAbout ? 'translate-up' : ''}`}>
                    <nav className="site-navigation">
                        <button id='about-btn' onClick={() => toggleAboutSection(setTranslateAbout, translateAbout, translateWorks, setTranslateWorks, translateContact, setTranslateContact)}>
                            <h2 className='section-title'>{restData.title.rendered}</h2>
                        </button>
                    </nav>
                    <div className='section-content'>
                        <div className='about-paragraph'>
                            {restData.acf.about_paragraph && (
                                <p>{restData.acf.about_paragraph}</p>
                            )}
                            {restData.acf.personal_about_paragraph && (
                                <p>{restData.acf.personal_about_paragraph}</p>
                            )}
                        </div>
                        {restData.acf.portrait && restData.acf.portrait.source_url && (
                            <div className='about-portrait-fun'>
                                <img 
                                    src={restData.acf.portrait.source_url} 
                                    alt={restData.acf.portrait.alt || "Portrait"} 
                                    srcSet={`
                                        ${restData.acf.portrait.source_url} 300w,
                                        ${restData.acf.portrait.source_url} 600w,
                                        ${restData.acf.portrait.source_url} 1200w
                                    `}
                                    sizes={`
                                        (max-width: 600px) 300px,
                                        (max-width: 1200px) 600px,
                                        1200px
                                    `}
                                />
                            </div>
                        )}
                        {restData.acf.passion_project && (
                            <p>{restData.acf.passion_project}</p>
                        )}
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default About;