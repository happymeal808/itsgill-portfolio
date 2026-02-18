import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import ThemeToggle from '../components/ThemeToggle';
import { applyTheme, getPreferredTheme } from '../utilities/theme';
import { useNav } from '../utilities/NavContext'; // 1. Import the hook

const Home = () => { // 2. Remove all those props from the parentheses!
    const { 
        translateWorks, setTranslateWorks, 
        translateAbout, setTranslateAbout, 
        translateContact, setTranslateContact,
        closeAll 
    } = useNav();
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
        // No document.getElementById!
    };

    const handleToggleAbout = () => {
        const isSmallScreen = window.innerWidth < 768;
        if (isSmallScreen) {
            setTranslateWorks(!translateWorks);
            setTranslateAbout(!translateAbout);
        } else {
            setTranslateAbout(!translateAbout);
        }
    };

    const handleHomeClick = () => {
        closeAll(); // Uses the function from your NavContext
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