import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import ThemeToggle from '../components/ThemeToggle';
import { applyTheme, getPreferredTheme } from '../utilities/theme';

const Home = ({ translateWorks, setTranslateWorks, translateAbout, setTranslateAbout, translateContact, setTranslateContact }) => {
    const restPath = restBase + 'pages/14';
    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [showSections, setShowSections] = useState(true);
    const [theme, setTheme] = useState(getPreferredTheme());

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
        };
        fetchData();
    }, [restPath]);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const handleToggleWorks = () => {
        setTranslateWorks(!translateWorks);
        document.getElementById('works').classList.toggle('translate-up');
    };

    const handleToggleAbout = () => {
        const isSmallScreen = window.innerWidth < 768;

        if (isSmallScreen) {
            // Toggle both Works and About sections on small screens
            setTranslateWorks(!translateWorks);
            document.getElementById('works').classList.toggle('translate-up');

            setTranslateAbout(!translateAbout);
            document.getElementById('about').classList.toggle('translate-up');
        } else {
            // Toggle only the About section on larger screens
            setTranslateAbout(!translateAbout);
            document.getElementById('about').classList.toggle('translate-up');
        }
    };

    const handleHomeClick = () => {
        setShowSections(!showSections);
        if (translateWorks) {
            setTranslateWorks(false);
            document.getElementById('works').classList.remove('translate-up');
        }
        if (translateAbout) {
            setTranslateAbout(false);
            document.getElementById('about').classList.remove('translate-up');
        }
        if (translateContact) {
            setTranslateContact(false);
            document.getElementById('contact').classList.remove('translate-up');
        }
    };

    return (
        <>
            <header className={`site-header home fade-in ${isLoaded ? 'show' : ''}`}>
                <nav className="site-navigation">
                    <button aria-label='Home Button' onClick={handleHomeClick} id='home-btn'>
                        <h1 className='section-title'>{restData ? restData.title.rendered : 'Home'}</h1>
                    </button>
                </nav>
            </header>
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                {isLoaded && restData && (
                    <section id='home'>
                        <div className="entry-content">
                            <ThemeToggle theme={theme} setTheme={setTheme} />
                            <p className='intro-text'>{restData.acf.introduction}</p>
                            <p className='about-text'>{restData.acf.intro_about}</p>
                            <div className="home-links">
                                <button aria-label='Works Button' onClick={handleToggleWorks}>
                                    {restData.acf.see_projects}
                                </button>
                                <button aria-label='About Button' onClick={handleToggleAbout}>
                                    {restData.acf.see_about}
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

export default Home;