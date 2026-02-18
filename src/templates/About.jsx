import { toggleAboutSection } from '../utilities/navigation';
import { useNav } from '../utilities/NavContext';

const About = ({ aboutData }) => {
    const { 
        translateAbout, setTranslateAbout, 
        translateWorks, setTranslateWorks, 
        translateContact, setTranslateContact 
    } = useNav();

    if (!aboutData) return null;

    return (
        <div className="fade-in show">
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
                    
                    {aboutData.acf.passion_project && <p>{aboutData.acf.passion_project}</p>}
                </div>
            </section>
        </div>
    );
};

export default About;