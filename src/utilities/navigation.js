const isSmallScreen = () => window.innerWidth < 768;
window.scrollTo(0, 1);

const toggleSection = (setTranslateFunction, sectionElement, shouldTranslate) => {
    setTranslateFunction(shouldTranslate);
    if (shouldTranslate) {
        sectionElement.classList.add('translate-up');
    } else {
        sectionElement.classList.remove('translate-up');
    }
};

const untoggleSections = (sections) => {
    sections.forEach(([setTranslateFunction, sectionElement]) => {
        setTranslateFunction(false);
        sectionElement.classList.remove('translate-up');
    });
};

export const toggleWorksSection = (setTranslateWorks, translateWorks, setTranslateAbout, translateAbout, setTranslateContact, translateContact) => {

    const worksSection = document.getElementById('works');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (!isSmallScreen()) {
        if (translateWorks) {
            toggleSection(setTranslateWorks, worksSection, false);
        } else {
            toggleSection(setTranslateWorks, worksSection, true);
            if (translateAbout) toggleSection(setTranslateAbout, aboutSection, false);
            if (translateContact) toggleSection(setTranslateContact, contactSection, false);
        }
        return;
    }

    if (translateWorks && translateAbout && !translateContact) {
        untoggleSections([
            [setTranslateAbout, aboutSection]
        ]);
        toggleSection(setTranslateWorks, worksSection, true);
    } else if (translateWorks && translateAbout && translateContact) {
        untoggleSections([
            [setTranslateAbout, aboutSection],
            [setTranslateContact, contactSection]
        ]);
        toggleSection(setTranslateWorks, worksSection, true);
    } else if (translateWorks) {
        untoggleSections([
            [setTranslateWorks, worksSection],
            [setTranslateAbout, aboutSection],
            [setTranslateContact, contactSection]
        ]);
    } else {
        toggleSection(setTranslateWorks, worksSection, true);
    }
};

export const toggleAboutSection = (setTranslateAbout, translateAbout, translateWorks, setTranslateWorks, translateContact, setTranslateContact) => {

    const aboutSection = document.getElementById('about');
    const worksSection = document.getElementById('works');
    const contactSection = document.getElementById('contact');

    if (!isSmallScreen()) {
        if (translateAbout) {
            toggleSection(setTranslateAbout, aboutSection, false);
        } else {
            toggleSection(setTranslateAbout, aboutSection, true);
            if (translateWorks) toggleSection(setTranslateWorks, worksSection, false);
            if (translateContact) toggleSection(setTranslateContact, contactSection, false);
        }
        return;
    }

    if (translateWorks && translateAbout && translateContact) {
        untoggleSections([
            [setTranslateContact, contactSection]
        ]);
        toggleSection(setTranslateAbout, aboutSection, true);
    } else if (translateAbout) {
        untoggleSections([
            [setTranslateAbout, aboutSection],
            [setTranslateContact, contactSection]
        ]);
    } else {
        toggleSection(setTranslateAbout, aboutSection, true);
        if (!translateWorks) toggleSection(setTranslateWorks, worksSection, true);
    }
};

export const toggleContactSection = (setTranslateContact, translateContact, translateWorks, setTranslateWorks, translateAbout, setTranslateAbout) => {

    const contactSection = document.getElementById('contact');
    const worksSection = document.getElementById('works');
    const aboutSection = document.getElementById('about');

    if (!isSmallScreen()) {
        if (translateContact) {
            toggleSection(setTranslateContact, contactSection, false);
        } else {
            toggleSection(setTranslateContact, contactSection, true);
            if (translateAbout) toggleSection(setTranslateAbout, aboutSection, false);
            if (translateWorks) toggleSection(setTranslateWorks, worksSection, false);
        }
        return;
    }

    if (translateContact) {
        untoggleSections([
            [setTranslateContact, contactSection]
        ]);
    } else {
        toggleSection(setTranslateContact, contactSection, true);
        if (!translateWorks) toggleSection(setTranslateWorks, worksSection, true);
        if (!translateAbout) toggleSection(setTranslateAbout, aboutSection, true);
    }
};