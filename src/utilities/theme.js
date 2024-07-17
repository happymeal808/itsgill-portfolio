export const applyTheme = (theme) => {
    const root = document.documentElement;
    root.dataset.theme = theme;
  };
  
  export const toggleTheme = (currentTheme, setTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  export const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };