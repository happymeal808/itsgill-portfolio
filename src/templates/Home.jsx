import { useState, useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { applyTheme, getPreferredTheme } from '../utilities/theme';

const Home = ({ homeData, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout, translateContact, setTranslateContact }) => {
    const [showSections, setShowSections] = useState(true);
    const [theme, setTheme] = useState(getPreferredTheme());

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

    if (!homeData) return null; // ✅ No "Loading..." flash

    return (
        <>
            <header className="site-header home">
                <nav className="site-navigation">
                    <button aria-label='Home Button' onClick={handleHomeClick} id='home-btn'>
                        <h1 className='section-title'>{homeData?.title?.rendered || 'Home'}</h1>
                    </button>
                </nav>
            </header>
            <section id='home'>
                <div className="entry-content">
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                    <p className='intro-text'>{homeData?.acf?.introduction}</p>
                    <p className='about-text'>{homeData?.acf?.intro_about}</p>
                    <div className="home-links">
                        <button aria-label='Works Button' onClick={handleToggleWorks}>
                            {homeData?.acf?.see_projects}
                        </button>
                        <button aria-label='About Button' onClick={handleToggleAbout}>
                            {homeData?.acf?.see_about}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
