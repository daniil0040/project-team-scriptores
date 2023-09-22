// НЕ ЗАБУДЬ ЗРОБИТИ ІМЕНОВАНИЙ ІМПОРТ ТА ЕКСПОРТ Ф-ЦІЇ ДО ФАЙЛУ main.js!!!!

(() => {
  const backdrop = document.querySelector('.backdrop')
  const mobileMenu = document.querySelector(".js-menu-container");
  const openMenuBtn = document.querySelector(".js-open-menu");
  const closeMenuButtons = document.querySelectorAll(".js-close-menu");
  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute("aria-expanded") === "true" || false;
    openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
    mobileMenu.classList.toggle("is-open");
    backdrop.classList.toggle('is-hidden');
    const scrollLockMethod = !isMenuOpen
      ? "disableBodyScroll"
      : "enableBodyScroll";
    bodyScrollLock[scrollLockMethod](document.body);
  };
  openMenuBtn.addEventListener("click", toggleMenu);
  closeMenuButtons.forEach((closeMenuBtn) => {
    closeMenuBtn.addEventListener("click", toggleMenu);
  });
  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    backdrop.classList.add('is-hidden');
    openMenuBtn.setAttribute("aria-expanded", false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();




////// HEDR MENU ACTIVE /////////
const linkActive = document.querySelectorAll('.header-link');
const wLocPath = window.location.pathname;
const moblinkActive = document.querySelectorAll('.mob-menu-item a')
for (const link of linkActive) {
  if (link.href.includes(wLocPath )) {
    link.classList.add('active-page')
    break;
  }
};

for (const link of moblinkActive) {
  if (link.href.includes(wLocPath )) {
    link.classList.add('active-page-mob')
    break;
  }
};
