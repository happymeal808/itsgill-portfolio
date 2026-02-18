import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleAboutSection } from '../utilities/navigation';
import { useNav } from '../utilities/NavContext'; // 1. Import

const About = () => {
    // 2. Grab everything we need from Context
    const { 
        translateAbout, setTranslateAbout, 
        translateWorks, setTranslateWorks, 
        translateContact, setTranslateContact 
    } = useNav();

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
                        }
                    }
                    setData(data);
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
                        <button 
                            aria-label='About Button' 
                            id='about-btn' 
                            onClick={() => toggleAboutSection(setTranslateAbout, translateAbout, translateWorks, setTranslateWorks, translateContact, setTranslateContact)}
                        >
                            <h2 className='section-title'>{restData.title.rendered}</h2>
                        </button>
                    </nav>
                    <div className='section-content'>
                        <div className='about-paragraph'>
                            {restData.acf.about_paragraph && <p>{restData.acf.about_paragraph}</p>}
                            {restData.acf.personal_about_paragraph && <p>{restData.acf.personal_about_paragraph}</p>}
                        </div>
                        {aboutData?.acf?.portrait?.source_url && (
                    <div className='about-portrait-fun'>
                        <img 
                            src={aboutData.acf.portrait.source_url} 
                            alt={aboutData.acf.portrait.alt || "Portrait"} 
                        />
                    </div>
                )}
                {aboutData?.acf?.passion_project && <p>{aboutData.acf.passion_project}</p>}
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default About;