//ФУНКЦІЯ ЯКА ФАРБУЄ ЗІРКИ В ЗАЛЕЖНОСТІ ВІД РЕЙТИНГУ
export function fillStars() {
    const starRatings = document.querySelectorAll('.rating');
    starRatings.forEach(starRating => {
      
      //Отримую рейтинг(текст контент) зі спану з цифрою рейтингу має клас'.number-rating'
      const rating = parseFloat(
        starRating.querySelector('.number-rating').textContent
      );
  
      //Округлюю до цілого числа
      const roundedRating = Math.round(rating);
  
      //Знахожу всі зірки в даній 'rating' через айді
      const stars = starRating.querySelectorAll('#all-stars');
  
      // Циклом по кожній зірці замальовую 
      stars.forEach((star, index) => {
        if (index < roundedRating) {
          star.classList.add('.filled');
        }
      });
    });
  };
//   пропоную змінити розмітку 
/* <div class="rating">
          <span class="number-rating">4.5</span>
   <div class="для позиціювання та задання стилів">       
            <svg class="one" class="reting-item filled" data-item-value="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-grey"></use>
            </svg>
          
          
            <svg class="reting-item filled" data-item-value="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-grey"></use>
            </svg>
          
          
            <svg class="reting-item filled" data-item-value="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-grey"></use>
            </svg>
         
          
            <svg class="reting-item filled" data-item-value="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-grey"></use>
            </svg>
         
          
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-grey"></use>
            </svg>
         </div>
          <button class="btn-see-recipe" type="button">See recipe</button>
        </div> */