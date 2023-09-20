import axios from 'axios';
import Notiflix from 'notiflix';

const openModalButton = document.getElementById('openModalBtn');
const closeModalButton = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const orderForm = document.getElementById('orderForm');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// Функція відкриття модального вікна
openModalBtn.addEventListener('click', () => {
    overlay.style.display = 'block';
    orderModal.style.display = 'block';
    setTimeout(() => {
        orderModal.style.opacity = '1';
    }, 10);
});

// Функція закриття модального вікна
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
orderModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// overlay.addEventListener('click', closeModal);

// Заборонити прокрутку в модальному вікні
orderModal.addEventListener('scroll', (e) => {
    e.preventDefault();
});

// // Функція відправки даних на бекенд і обробки відповіді
// function sendRequest(data) {
//     const url = `${BASE_URL}/orders/add`; 

//     axios.post(url, data, {
//         headers: {
//             'Content-Type': 'application/json', 
//         },
//     })
//         .then(response => {
//             if (response.data.success) {
//                 // Закриваємо модальне вікно
//                 closeModalBtn.click();
//                 // Відображаємо нотіфікацію про успішну відправку
//                 Notiflix.Notify.success('Дані успішно відправлені на сервер');
//             } else {
//                 // Відображаємо помилку користувачу
//                 Notiflix.Notify.failure('Помилка: ' + response.data.error);
//             }
//         })
//         .catch(error => {
//             console.error('Помилка при відправленні запиту:', error);
//             // Відображаємо помилку користувачу
//             Notiflix.Notify.failure('Помилка при відправленні запиту.');
//         });
// }

// // Очищення полів форми при натисканні кнопки "Send"
// orderForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const formData = {
//         name: document.getElementById('name').value,
//         phone: document.getElementById('phone').value,
//         email: document.getElementById('email').value,
//         comment: document.getElementById('comment').value,
//     };
//     sendRequest(formData); // Відправляємо дані на бекенд
//     orderForm.reset();
// });