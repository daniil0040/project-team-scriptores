import { getAllSomething } from "../service-api"
import { createAllCategCardsMarkup } from "./all-categ-cards"
import { getAllRecipes } from "../service-api";
import { buttonAllCategories } from "./all-categ-btn";

const recipes = document.querySelector('.category-list-js');
export const cardsContainer = document.querySelector(".cards-container-js")
getAllSomething('categories').then(data => {
    recipes.insertAdjacentHTML('beforeend', createCategoriesMarkup(data))
    function createCategoriesMarkup() {
        return data.map(({ _id, name }) =>
            `<li>
            <button id="${_id}" class="category-button">${name}</button>
            </li>`
        )
            .join('');
    }
});




//Додаткові методи(функції) які також працюють

/*const category_url = 'https://tasty-treats-backend.p.goit.global/api/categories';
axios.get(category_url).then(response => {
    const recipes = document.querySelector('.category-list');
    const recipes_markup = response.data
      .map(
        category => `<li>
        <button class="category-button" href="#">${category.name}</button>
        </li>`
      )
      .join('');
    recipes.innerHTML = recipes_markup;
  
  });*/


  /*
getAllSomething("categories")
    .then(data => {
    recipes.insertAdjacentHTML('beforeend', recipesMarkup(data)) 
})
    .catch(err => {
        console.log(err);
    })

function recipesMarkup(data) {
    return data.map(({ _id, name }) =>
         `<li>
            <button id="${_id}" class="category-button">${name}</button>
            </li>
    ).join('');
}*/


recipes.addEventListener("click", categorySelection)
export let prevCategory = null
export let isAllCategories = true
function categorySelection(event) {
    let category = event.target.closest("button")
    if(category === null) return 
    if (category.textContent !== prevCategory) {     
  
        prevCategory = category.textContent
        isAllCategories = false
        buttonAllCategories.classList.remove("all-categories-button-active")
            if (category) {
                getAllRecipes(category.textContent)
                .then(data => {
                    cardsContainer.innerHTML = createAllCategCardsMarkup(data.results)
       
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }  
}

export function resetPrev() {
    prevCategory = null
}