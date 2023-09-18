const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const overlay = document.getElementById('overlay');
const orderModal = document.getElementById('orderModal');
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

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Додайте код для обробки відправки форми тут
    // Наприклад, відправка даних на сервер або інші дії.
    closeModalBtn.click();
});