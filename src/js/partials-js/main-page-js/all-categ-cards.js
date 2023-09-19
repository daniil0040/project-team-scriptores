import { getAllRecipes } from '../service-api';
export const cardsContainer = document.querySelector('.cards-container-js');

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
        <button class="like-btn icon-heart  js-add" data-id="${_id}" type="button"></button>
        <h2 class="card-heading">${title}</h2>
        <div class="text-container">
          <p class="card-text">
            ${description}
          </p>
        </div>

        <div class="rating">
        
          <span class="number-rating">${Math.round(rating)}</span>
          <div class="reting-item filled" data-item-value="">
            
          </div>
          <div class="reting-item filled" data-item-value="">
            
          </div>
          <div class="reting-item filled" data-item-value="">
            
          </div>
          <div class="reting-item filled" data-item-value="">
            
          </div>
          <div class="reting-item filled"  data-item-value="">
            
          </div>
     <button class="btn-see-recipe btn-see-recipe-js" type="button" data-id= "${_id}">See recipe</button>

          </div
       
      
   
    </li>
    `
    )
    .join('');
}
