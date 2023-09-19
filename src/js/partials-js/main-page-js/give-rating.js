import axios from 'axios';
import Notiflix from 'notiflix';


// js-rating - потрібно додатки до кнопки Give a rating!!!!!!!!
// те що стосується безпосередню відкриття модального вікна 
const backdrop = document.querySelector('.rating-backdrop');
document.addEventListener('click', function (event) {
    // Перевірка, чи було натиснуто кнопку 
    if (event.target.classList.contains('js-rating')) {
        // Рендерінг модального вікна і кнопки 
        const closeModalBtn = document.getElementById('rating-close-btn');
        const modal = document.querySelector('.rating-modal');
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


////////////////////////////////////////////////////
//функції що вже працюють в відкритій модальці//////

 //функція що відслідковує проставляння рейтингу 
const stars = document.querySelectorAll('.rating-set input[type="radio"]');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const starCount = parseInt(star.value);
        changeColor(starCount);
    }); 
});
//функція що замальовує зірочки 
function changeColor(starCount) {
 //const stars = document.querySelectorAll('.rating-set input[type="radio"]');
 const ratingValue = document.querySelector(".rating-value")
  for (let i = 0; i < stars.length; i += 1) {
 const starLabel = stars[i].nextElementSibling;
 const starSVG = starLabel.querySelector('.star-rating');
  if (i < starCount) {
 starSVG.classList.add('active');
  } else {
 starSVG.classList.remove('active');
  }
}
ratingValue.textContent = starCount.toFixed(1); 
};




//функція перевірки заповнення поля рейтингу та емейлу 
const  formEl = document.querySelector('.login-form')

formEl.addEventListener('submit', onSubmit)
function onSubmit(evt) {
    evt.preventDefault();
    const { email, input } = evt.currentTarget.elements
    if (email.value === "" || input.value === "") {
        alert("Please fill in all the fields!");
        return;
    }

    const meaning = {
        email: email.value,
        input: input.value
    }
    console.log(meaning)
    evt.currentTarget.reset();
}






















/*
let url;
let id = '';
let inputValue = '';
let ratingValue = 1;

/*
async function addRating(id) {
    try {
        
       // const URL = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}/rating`;

        const obj = { rate: ratingValue, email: inputValue, };

        const responseFromRating = await axios.patch(URL, obj);
        return responseFromRating;
        Notiflix.Report.success(
            'Your rating was successfully added,please enter a new Email '
        );

    } catch (err) {
        if (err.response.status === 409) {
            Notiflix.Report.failure(
                'You have already rated this recipe',
                err.message
            );
        }
        /*if (err.response.status === 400) {
            Notiflix.Report.failure(
                'An error occured,plase try again',
                err.message
            );
        }*//*
        backdrop.classList.remove('visible');
    }
};*//*
addRating();
(function setRatingValue(rating) {
    ratingValue = Number(rating);
}());

(function setInpValue(inpValue) {
    inputValue = inpValue;
}());
(function setId(id) {
    id = id;
}());*/

//const RatingAdd = new addARating();



     
/*
        function modalRating() {
            const refs = {
              //closeBtnModal: document.querySelector('rating-close-btn'),
              ratingBackdrop: document.querySelector('.rating-backdrop'),
              ratingEmailBtn: document.querySelector('.rating-btn'),
              starInputs: document.querySelectorAll('.star-input'),
              ratingEmailInp: document.querySelector('.rating-email'),
            };          
           /* refs.closeBtnModal.addEventListener('click', () => {
              refs.ratingBackdrop.classList.add('visible');
              changeColor(0);
              enableScroll();
            });*/
          /*
            refs.starInputs.forEach(input => {
              input.addEventListener('click', event => {
                const star = event.target;
          
                const ratingValue = star.value;
                addRating.setRatingValue(ratingValue);
              });
            });
          
            refs.ratingEmailBtn.addEventListener('click', () => {
              
              refs.ratingBackdrop.classList.add('visible');
              enableScroll();
              changeColor(0); // !!!!!!!!!!!!!!!!! при отправке на backend должы обновиться звезды, но и отправиться
          
              const inpValue = refs.ratingEmailInp.value.trim();
             
             
              if (inpValue === '') {
                window.alert('Please enter a valid query');
                return;
              }
              const id = refs.ratingEmailBtn.id;
              addRating.setInpValue(inpValue);
              addRating.setId(id);
              addRating();
               refs.ratingEmailInp.value = ""
            });
          
            refs.ratingBackdrop.addEventListener('click', evt => {
              if (evt.target === refs.ratingBackdrop) {
                refs.ratingBackdrop.classList.add('visible');
                enableScroll();
              }
            });
          
            document.addEventListener('keydown', evt => {
              if (evt.key === 'Escape') {
                changeColor(0);
                refs.ratingBackdrop.classList.add('visible');
                enableScroll();
              }
            });*/
          
          
         // };
          
         
          
          
          // function disableScroll() {
          //   document.body.classList.add('scroll-lock');
          // };
          
          /*
          function enableScroll() {
            document.body.classList.remove('scroll-lock');
          };*/
          
          
          //modalRating();
          

// function disableScroll() {
//   document.body.classList.add('scroll-lock');
// };


/* function enableScroll() {
   document.body.classList.remove('scroll-lock');
 };
 
 
 //modalRating();
 
 
 
/////////////////////////////////////////////
//розібратись з валідацію модалки  */
 
 const emailInput = document.querySelector('.rating-email');
 const ratingInputs = document.querySelectorAll('.star-input');
 const submitButton = document.querySelector('.rating-btn');
 
 // MODAL-VALIDATION //
 
 /*
 
 // Функция для проверки валидности email
 function isValidEmail(email) {
   // Используем встроенную валидацию HTML5 для поля email
   return emailInput.checkValidity();
 }
 
 // Функция для проверки состояния выбора рейтинга
 function isRatingSelected() {
   // Проверяем, есть ли выбранный элемент с классом 'star-input'
   return [...ratingInputs].some(input => input.checked);
 }
 
 // Функция для обновления состояния кнопки отправки
 function updateSubmitButtonState() {
   // Проверяем валидность email и выбран ли рейтинг
   const isEmailValid = isValidEmail(emailInput.value);
   const isRatingValid = isRatingSelected();
 
   // Если оба условия выполнены, активируем кнопку отправки
   submitButton.disabled = !(isEmailValid && isRatingValid);
 }
 
 // Слушаем события изменения поля email и выбора рейтинга
 emailInput.addEventListener('input', updateSubmitButtonState);
 ratingInputs.forEach(input => input.addEventListener('change', updateSubmitButtonState));

*/














/*
////////////////////////////////////////////////////////////
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
   initRatings();
}
function initRatings() {
 let ratingActive, ratingValue;
 for (let index = 0; index < ratings.length; index++) {
   const rating = ratings[index];
   initRating(rating);
 }
 function initRating(rating) {
   initRatingVars(rating);

   setRatingActiveWidth();

   if (rating.classList.contains('rating-set')) {
     setRating(rating);
   }
       
 }

 function initRatingVars(rating) {
   ratingActive = rating.querySelector('.rating-active');
   ratingValue = rating.querySelector('.rating-value')
 }

 function setRatingActiveWidth(index = ratingValue.innerHTML) {
   const ratingActiveWidth = index / 0.05;
   ratingActive.style.width = `${ratingActiveWidth}%`;
       
 }
 function setRating(rating) {
   const ratingItems = rating.querySelectorAll('.rating-item');
   for (let index = 0; index < ratingItems.length; index++) {
     const ratingItem = ratingItems[index];
     ratingItem.addEventListener('mouseenter', function () {
       initRatingVars(rating);
       setRatingActiveWidth(ratingItem.value);
     });
     ratingItem.addEventListener('mouseleave', function (e) {
       setRatingActiveWidth();
   
     });
 
     ratingItem.addEventListener('click', function (e) {
       initRatingVars(rating);
       if (rating.dataset.ajax) {
         setRatingValue(ratingItem.value, rating);
       } else {
         ratingValue.innerHTML = index + 1;
         setRatingActiveWidth();
       }
     });
   }
   async function setRatingValue(value, rating) {
     if (!rating.classList.contains('rating_sending')) {
       rating.classList.add('rating_sending');
       let response = await fetch('https://tasty-treats-backend.p.goit.global/api/recipes/', {
         method: 'GET',

       });
       if (response.ok) {
         const result = await response.json();
         const newRating = result.newRating;
         ratingValue.innerHTML = newRating;
         setRatingActiveWidth();
         rating.classList.remove('rating_sending');
       } else {
         alert('error');

         rating.classList.remove('rating_sending');
       }
         
       }
     }
   }
 }
*/






