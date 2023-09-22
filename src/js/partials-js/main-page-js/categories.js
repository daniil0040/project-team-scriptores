import { getAllSomething } from '../service-api';
import {
  addPagination,
  createAllCategCardsMarkup,
  fillStars,
} from './all-categ-cards';
import { getAllRecipes } from '../service-api';
import { buttonAllCategories } from './all-categ-btn';
import { restoreLikeStates } from '../main-page-js/liked-recipe';
import common from '../components/common.json';
let recipesFavorite = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
const recipes = document.querySelector('.category-list-js');

export const cardsContainer = document.querySelector('.cards-container-js');
getAllSomething('categories').then(data => {
  recipes.insertAdjacentHTML('beforeend', createCategoriesMarkup(data));
  
  function createCategoriesMarkup() {
    return data
      .map(
        ({ _id, name }) =>
          `<li>
            <button id="${_id}" class="category-button category-button-js">${name}</button>
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

recipes.addEventListener('click', categorySelection);
export let prevCategory = null;
function categorySelection(event) {
  let category = event.target.closest('button');
  if (category === null) return;
  if (category.textContent !== prevCategory) {
    prevCategory = category.textContent;
    buttonAllCategories.classList.add('all-categories-button-active');
    removeCatListStyle();
    if (category) {
      
      getAllRecipes(category.textContent)
        .then(data => {
          cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
          const likeButtons = document.querySelectorAll('.js-add');
          // перед завантаженням перевірка чи лайкнуті картки
          restoreLikeStates(likeButtons);
          fillStars();
          addPagination(data);
          
          const prevActiveEl = document.querySelector('[active="true"]');
          if (prevActiveEl) {
            prevActiveEl.removeAttribute('active');
          }

          category.setAttribute('active', true);
          colorizeCategory(event)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}

export function resetPrev() {
  prevCategory = null;
}

function colorizeCategory(event) {
  const catBtn = document.querySelectorAll(".category-button-js");

  buttonAllCategories.classList.remove('all-categ-btn-active');
  if (!event.target.classList.contains('category-button-js')) {
    return;
  }
  const textCurrBtn = event.target.textContent;

  catBtn.forEach(btn => {
    btn.classList.remove('category-button-active')
    if (btn.innerHTML === textCurrBtn) {
      event.target.classList.add('category-button-active')
    }
  })
  
  return;

  
}
export function removeCatListStyle() {
  const catBtn = document.querySelectorAll(".category-button-js");
    catBtn.forEach(btn => {
      btn.classList.remove('category-button-active')
    })
  }