import {getAllRecipes} from "../service-api"

const recipesContainer = document.querySelector('.popular-recipes-container');
const recipesWrap = document.querySelector('.popular-recipes-wrap');

// робимо get запит 
getAllRecipes("Popular")
.then(data=> {
 
    recipesContainer.insertAdjacentHTML("beforeend", createMarkup(data))})
.catch(err=>{
    console.log(err);
})
    
// Відмальовуємо розмітку
function createMarkup (arr) {
    return arr.map(({ _id, title, description, preview }) => `
      <div class="popular-recipes-wrap" data-id="${_id}">
        <picture>
          <source srcset="${preview}" type="image/webp">
          <source srcset="${preview}" type="image/jpeg">
          <img src="${preview}" alt="${title}" loading="lazy" class="popular-recipes-img" width="64px" height="64px">
        </picture>
        <div class="popular-recipes-info-wrap">
          <h3 class="popular-recipes-subtitle">${title}</h3>
          <p class="popular-recipes-text">${description}</p>
        </div>
      </div>`
        ).join("")
    }
      
    
 
  