import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// js-rating - потрібно додатки до кнопки Give a rating!!!!!!!!

const backdrop = document.querySelector('.rating-backdrop');

////////////////////////////////////////////////////////////
// те що стосується безпосередню відкриття модального вікна 
document.addEventListener('click', function (event) {
    // Перевірка, чи було натиснуто кнопку 
    if (event.target.classList.contains('js-rating')) {
        // Рендерінг модального вікна і кнопки 
        const closeModalBtn = document.getElementById('rating-close-btn');
        const formRating = document.querySelector('.rating-modal form');
        closeModalBtn.addEventListener('click', closeModal);
        formRating.addEventListener('submit', (e) => e.preventDefault());
        openModal()
    }
})
//відкриття модалкі
function openModal() {
    backdrop.style.display = 'block';
    backdrop.addEventListener('click', (evt) => {
        if (!evt.target.classList.contains('rating-backdrop')) {
            return
        }
        closeModal()
    })
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            closeModal()
        }
    });

}
//закриття модалкі
function closeModal() {
    backdrop.style.display = 'none';
    document.removeEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            closeModal()
        }
    })
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//функції що працюють вже в відкритій модальці//////
const stars = document.querySelectorAll('.rating-set input[type="radio"]');
const ratingValue = document.querySelector(".rating-value")
 //функція що відслідковує проставляння рейтингу 
stars.forEach(star => {
    star.addEventListener('click', () => {
        const starCount = parseInt(star.value);
        changeColor(starCount);
    }); 
});
//функція що замальовує зірочки 
function changeColor(starCount) {  
  for (let i = 0; i < stars.length; i += 1) {
 const starLabel = stars[i].nextElementSibling;
 const starSVG = starLabel.querySelector('.star-rating');
  if (i < starCount) {
 starSVG.classList.add('activeR');
  } else {
 starSVG.classList.remove('activeR');
  }
}
ratingValue.textContent = starCount.toFixed(1); 
};

//функція перевірки заповнення поля рейтингу та емейлу 
const  formEl = document.querySelector('.login-form');
formEl.addEventListener('submit', onSubmit);
//const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/'; //не працює backend

async function onSubmit(e) {
  e.preventDefault();
   const { rating, email } = e.currentTarget;

  const inputValues = {
    rate: Number(rating.value),
    email: email.value,
  }   
  if (inputValues.rate === 0 || inputValues.email.trim() === '') {
    Notify.failure(
      `Please fill in all the fields!`
     );
    return;
  }
  changeColor(0);//підчас відправлення на backend(не працює backend) повинні обновитися зірочки а також відправитись 
  e.currentTarget.reset();
  closeModal()
  
  /*await axios //не працює backend
    .patch(`${BASE_URL}${toId}/rating`, inputValues)
    .then(response => {
      Notify.success(
        `Great`,
        `Completly added rating for ${response.data.title}`,
        `Return`,
        
      );

      closeModal()
    })
    .catch(error => {
      Notify.failure(`${error.response.data.message}`);
    });*/
}

