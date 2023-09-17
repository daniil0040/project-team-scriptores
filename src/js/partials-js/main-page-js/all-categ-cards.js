
import { getAllRecipes } from '../service-api';
const cardsContainer = document.querySelector('.cards-container-js');

getAllRecipes()
  .then(data => {
    cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
  })
  .catch(err => {
    console.log(err);
  });

export function createAllCategCardsMarkup(arr) {
  return arr
    .map(
      ({ preview, title, description, rating, _id, tags }) => `
    <li class="recipes-card" data-tags="${tags}" >
        
      <img class="recipes-img" src="${preview}" alt="${title}" />
      <div class="card-description">
        <button class="like-btn" type="button">
          <svg class="like-logo liked" width="22" height="22">
            <use href="/src/img/sprite/icons.svg#heart"></use>
          </svg>
        </button>
        <h2 class="card-heading">${title}</h2>
        <div class="text-container">
          <p class="card-text">
            ${description}
          </p>
        </div>

        <div class="rating">
        
          <span class="number-rating">${Math.round(rating)}</span>
          <div class="reting-item filled" data-item-value="">
            <svg class="one" width="18" height="18">
              <use href=".img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="./src/img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
     <button class="btn-see-recipe btn-see-recipe-js" type="button" data-id= "${_id}">See recipe</button>

          </div
       
      
   
    </li>
    `
    )
    .join('');
}
