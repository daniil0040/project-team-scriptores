const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const ATTR_NAME = 'data-theme';
const STORAGE_PROP_NAME = 'theme';

const getTheme = () => {
  const storedTheme = localStorage.getItem(STORAGE_PROP_NAME);

  const userPreferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? DARK_THEME
    : LIGHT_THEME;
  return storedTheme || userPreferredTheme;
};

const setThemeAttr = value => {
  document.documentElement.setAttribute(ATTR_NAME, value);

  const toggles = document.querySelectorAll('.input-switcher');

  if (!toggles.length) {
    return;
  }

  toggles.forEach(toggle => {
    toggle.checked = value === DARK_THEME;
  });
};

const toggleTheme = () => {
  const currentTheme = getTheme();

  const targetTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  setThemeAttr(targetTheme);

  localStorage.setItem(STORAGE_PROP_NAME, targetTheme);
};

const addToggleEventListeners = () => {
  const toggles = document.querySelectorAll('.input-switcher');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', toggleTheme);
  });
};

const initializeTheme = () => {
  const currentTheme = getTheme();

  setThemeAttr(currentTheme);

  addToggleEventListeners();
};

initializeTheme();
