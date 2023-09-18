const scrollButton = document.querySelector('.btn_scroll');
let isScrolling = false;

scrollButton.addEventListener('click', scrollUp);
window.addEventListener('scroll', scrollBtnVisibility);

function scrollBtnVisibility() {
  if (window.scrollY <= 200 && window.scrollY >= 0) {
    scrollButton.style.opacity = '0';
  } else {
    scrollButton.style.opacity = '1';
  }
}

function scrollUp() {
  if (!isScrolling) {
    isScrolling = true;
    scrollUpAnimation();
  }
}

function scrollUpAnimation() {
  if (window.scrollY > 0) {
    window.scrollBy(0, -100);  
    requestAnimationFrame(scrollUpAnimation);
  } else {
    isScrolling = false;
  }
}