const openModalButton = document.getElementById('openModalBtn');
const closeModalButton = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const orderForm = document.getElementById('orderForm');

openModalBtn.addEventListener('click', () => {
    overlay.style.display = 'block';
    orderModal.style.display = 'block';
    setTimeout(() => {
        orderModal.style.opacity = '1';
    }, 10);
});

closeModalBtn.addEventListener('click', () => {
    orderModal.style.opacity = '0';
    setTimeout(() => {
        orderModal.style.display = 'none';
        overlay.style.display = 'none';
    }, 300);
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModalBtn.click();
    }
});

// Очищення полів форми при натисканні кнопки "Send"
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderForm.reset();
});

// Заборона взаємодії з іншими елементами сайту коли модальне вікно відкрите
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

overlay.addEventListener('click', closeModal);

// Заборонити прокрутку в модальному вікні
modal.addEventListener('scroll', (e) => {
    e.preventDefault();
});