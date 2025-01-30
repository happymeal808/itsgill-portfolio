import React, { useState, useEffect } from 'react';
import Home from './templates/Home';
import About from './templates/About';
import Works from './templates/Works';
import Contact from './templates/Contact';
import Loading from './templates/Loading';
import { restBase } from './utilities/Utilities';

function App() {
    const [selectedWork, setSelectedWork] = useState(null);
    const [translateWorks, setTranslateWorks] = useState(false);
    const [translateAbout, setTranslateAbout] = useState(false);
    const [translateContact, setTranslateContact] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [contentFadeIn, setContentFadeIn] = useState(false); // ✅ Controls global fade-in

    // Preloaded Data
    const [homeData, setHomeData] = useState(null);
    const [aboutData, setAboutData] = useState(null);
    const [worksData, setWorksData] = useState(null);
    const [worksTitle, setWorksTitle] = useState('');
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            const minimumLoadingTime = new Promise((resolve) => setTimeout(resolve, 1150));
            const resourceLoading = new Promise((resolve) => setTimeout(resolve, 750));

            const homePath = `${restBase}pages/14`;
            const aboutPath = `${restBase}pages/18`;
            const worksPath = `${restBase}posts?_embed=true`;
            const worksTitlePath = `${restBase}pages?slug=works`;
            const contactPath = `${restBase}pages/20`;

            try {
                const [homeResponse, aboutResponse, worksResponse, worksTitleResponse, contactResponse] = await Promise.all([
                    fetch(homePath),
                    fetch(aboutPath),
                    fetch(worksPath),
                    fetch(worksTitlePath),
                    fetch(contactPath)
                ]);

                if (homeResponse.ok) setHomeData(await homeResponse.json());
                if (aboutResponse.ok) setAboutData(await aboutResponse.json());
                if (worksResponse.ok) setWorksData(await worksResponse.json());

                if (worksTitleResponse.ok) {
                    const worksTitleData = await worksTitleResponse.json();
                    if (worksTitleData.length > 0) setWorksTitle(worksTitleData[0].title.rendered);
                }

                if (contactResponse.ok) setContactData(await contactResponse.json());

                // Ensure minimum loading time before removing `Loading.jsx`
                await Promise.all([minimumLoadingTime, resourceLoading]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setFadeOut(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setTimeout(() => setContentFadeIn(true), 300); // ✅ Delay fade-in for a smooth transition
                }, 1500); // ✅ Matches loading fade-out time
            }
        };

        fetchAllData();

        const fetchAboutData = async () => {
            try {
                const response = await fetch(`${restBase}pages/18`);
                if (response.ok) {
                    const data = await response.json();
    
                    // ✅ Check if portrait is an ID and fetch media data
                    if (data?.acf?.portrait && typeof data.acf.portrait === "number") {
                        const portraitResponse = await fetch(`${restBase}media/${data.acf.portrait}`);
                        if (portraitResponse.ok) {
                            const portraitData = await portraitResponse.json();
                            data.acf.portrait = portraitData; // ✅ Replace ID with full object
                        }
                    }
    
                    setAboutData(data);
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };
    
        fetchAboutData();
    }, []);

    return (
        <>
            {/* ✅ Overlay stays on top but fades away when data is ready */}
            {isLoading && <Loading fadeOut={fadeOut} />}

            {/* ✅ Apply fade-in effect to all content after loading fades out */}
            <main id="main" className={`content ${contentFadeIn ? 'fade-in' : ''}`}>
                <Home 
                    homeData={homeData} 
                    translateWorks={translateWorks} 
                    setTranslateWorks={setTranslateWorks} 
                    translateAbout={translateAbout}
                    setTranslateAbout={setTranslateAbout}
                    translateContact={translateContact}
                    setTranslateContact={setTranslateContact}
                />
                <Works 
                    selectedWork={selectedWork}
                    setSelectedWork={setSelectedWork}
                    worksTitle={worksTitle} 
                    worksData={worksData} 
                    translateWorks={translateWorks} 
                    setTranslateWorks={setTranslateWorks} 
                    translateAbout={translateAbout}
                    setTranslateAbout={setTranslateAbout}
                    translateContact={translateContact}
                    setTranslateContact={setTranslateContact}
                />
                <About 
                    aboutData={aboutData} 
                    translateAbout={translateAbout} 
                    setTranslateAbout={setTranslateAbout} 
                    translateWorks={translateWorks} 
                    setTranslateWorks={setTranslateWorks}
                    translateContact={translateContact}
                    setTranslateContact={setTranslateContact}
                />
                <Contact 
                    contactData={contactData} 
                    translateContact={translateContact} 
                    setTranslateContact={setTranslateContact}
                    translateWorks={translateWorks} 
                    setTranslateWorks={setTranslateWorks} 
                    translateAbout={translateAbout}
                    setTranslateAbout={setTranslateAbout}
                />
            </main>
        </>
    );
}

export default App;
