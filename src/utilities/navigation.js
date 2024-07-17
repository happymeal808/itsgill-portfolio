const isSmallScreen = () => window.innerWidth < 768;
window.scrollTo(0, 1); 


export const toggleWorksSection = (setTranslateWorks, translateWorks, setTranslateAbout, translateAbout, setTranslateContact, translateContact) => {
    
    const worksSection = document.getElementById('works');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (!isSmallScreen()) {
        if (translateWorks) {
            setTranslateWorks(false);
            worksSection.classList.remove('translate-up');
        } else {
            setTranslateWorks(true);
            worksSection.classList.add('translate-up');

            if (translateAbout) {
                setTranslateAbout(false);
                aboutSection.classList.remove('translate-up');
            }

            if (translateContact) {
                setTranslateContact(false);
                contactSection.classList.remove('translate-up');
            }
        }
        return;
    }


    if (translateWorks) {
        // If works is already toggled, untoggle works and any other toggled sections
        setTranslateWorks(false);
        worksSection.classList.remove('translate-up');

        if (translateAbout) {
            setTranslateAbout(false);
            aboutSection.classList.remove('translate-up');
        }
        if (translateContact) {
            setTranslateContact(false);
            contactSection.classList.remove('translate-up');
        }
    } else {
        // If all sections are toggled, untoggle all sections
        if (translateWorks && translateAbout && translateContact) {
            setTranslateWorks(false);
            setTranslateAbout(false);
            setTranslateContact(false);
            worksSection.classList.remove('translate-up');
            aboutSection.classList.remove('translate-up');
            contactSection.classList.remove('translate-up');
        } else {
            // Toggle works
            setTranslateWorks(true);
            worksSection.classList.add('translate-up');
        }
    }
};

export const toggleAboutSection = (setTranslateAbout, translateAbout, translateWorks, setTranslateWorks, translateContact, setTranslateContact) => {

    const aboutSection = document.getElementById('about');
    const worksSection = document.getElementById('works');
    const contactSection = document.getElementById('contact');

    if (!isSmallScreen()){
        if (translateAbout) {
            setTranslateAbout(false);
            aboutSection.classList.remove('translate-up');
        } else {
            setTranslateAbout(true);
            aboutSection.classList.add('translate-up');

            if (translateWorks) {
                setTranslateWorks(false);
                worksSection.classList.remove('translate-up');
            }

            if (translateContact) {
                setTranslateContact(false);
                contactSection.classList.remove('translate-up');
            }
            
        }
        return;
    } 
    if (translateAbout) {
        // If about is already toggled, untoggle it
        setTranslateAbout(false);
        aboutSection.classList.remove('translate-up');
        
        // Ensure contact is untoggled if it was toggled up
        if (translateContact) {
            setTranslateContact(false);
            contactSection.classList.remove('translate-up');
        }
    } else {
        // If both about and contact are toggled, untoggle them
        if (translateAbout && translateContact) {
            setTranslateAbout(false);
            setTranslateContact(false);
            aboutSection.classList.remove('translate-up');
            contactSection.classList.remove('translate-up');
        } else {
            // Toggle about
            setTranslateAbout(true);
            aboutSection.classList.add('translate-up');

            // Ensure works is toggled
            if (!translateWorks) {
                setTranslateWorks(true);
                worksSection.classList.add('translate-up');
            }
        }
    }
};

export const toggleContactSection = (setTranslateContact, translateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout) => {

    const contactSection = document.getElementById('contact');
    const worksSection = document.getElementById('works');
    const aboutSection = document.getElementById('about');

    if (!isSmallScreen()){
        if (translateContact) {
            setTranslateContact(false);
            contactSection.classList.remove('translate-up');
        } else {
            setTranslateContact(true);
            contactSection.classList.add('translate-up');

            if (translateAbout) {
                setTranslateAbout(false);
                aboutSection.classList.remove('translate-up');
            }
            if (translateWorks) {
                setTranslateWorks(false);
                worksSection.classList.remove('translate-up');
            }
        }
        return;
    }

    if (translateContact) {
        // If contact is already toggled, untoggle it
        setTranslateContact(false);
        contactSection.classList.remove('translate-up');
    } else {
        // Toggle contact
        setTranslateContact(true);
        contactSection.classList.add('translate-up');

        // Ensure works is toggled
        if (!translateWorks) {
            setTranslateWorks(true);
            worksSection.classList.add('translate-up');
        }

        // Ensure about is toggled
        if (!translateAbout) {
            setTranslateAbout(true);
            aboutSection.classList.add('translate-up');
        }
    }
};