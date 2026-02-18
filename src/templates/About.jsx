import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { toggleAboutSection } from '../utilities/navigation';
import { useNav } from '../utilities/NavContext';

const About = () => {
    // 1. Grab navigation states from Context
    const { 
        translateAbout, setTranslateAbout, 
        translateWorks, setTranslateWorks, 
        translateContact, setTranslateContact 
    } = useNav();

    // 2. Set up local state for data
    const [aboutData, setAboutData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Adjust ID '18' if your WordPress ID is different
                const response = await fetch(`${restBase}pages/18`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Handle the portrait image fetch if ACF returns an ID
                    if (data.acf?.portrait && typeof data.acf.portrait === "number") {
                        const portRes = await fetch(`${restBase}media/${data.acf.portrait}`);
                        if (portRes.ok) {
                            data.acf.portrait = await portRes.json();
                        }
                    }
                    
                    setAboutData(data);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchData();
    }, []);

    // 3. Render
    return (
        <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
            {isLoaded && aboutData && (
                <section id='about' className={`section ${translateAbout ? 'translate-up' : ''}`}>
                    <nav className="site-navigation">
                        <button 
                            aria-label='About Button' 
                            id='about-btn' 
                            onClick={() => toggleAboutSection(
                                setTranslateAbout, translateAbout, 
                                translateWorks, setTranslateWorks, 
                                translateContact, setTranslateContact
                            )}
                        >
                            <h2 className='section-title'>{aboutData.title.rendered}</h2>
                        </button>
                    </nav>
                    
                    <div className='section-content'>
                        <div className='about-paragraph'>
                            {aboutData.acf.about_paragraph && <p>{aboutData.acf.about_paragraph}</p>}
                            {aboutData.acf.personal_about_paragraph && <p>{aboutData.acf.personal_about_paragraph}</p>}
                        </div>
                        
                        {aboutData.acf?.portrait?.source_url && (
                            <div className='about-portrait-fun'>
                                <img 
                                    src={aboutData.acf.portrait.source_url} 
                                    alt={aboutData.acf.portrait.alt_text || "Portrait"} 
                                />
                            </div>
                        )}
                        
                        {aboutData.acf.passion_project && (
                            <div className="passion-project">
                                <p>{aboutData.acf.passion_project}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default About;