import { createContext, useState, useContext } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [translateWorks, setTranslateWorks] = useState(false);
    const [translateAbout, setTranslateAbout] = useState(false);
    const [translateContact, setTranslateContact] = useState(false);

    // Helper to reset everything (useful for the Home button)
    const closeAll = () => {
        setTranslateWorks(false);
        setTranslateAbout(false);
        setTranslateContact(false);
    };

    return (
        <NavContext.Provider value={{ 
            translateWorks, setTranslateWorks, 
            translateAbout, setTranslateAbout, 
            translateContact, setTranslateContact,
            closeAll 
        }}>
            {children}
        </NavContext.Provider>
    );
};

// Custom hook for easy access
export const useNav = () => useContext(NavContext);