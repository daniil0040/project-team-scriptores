import { getAllRecipes } from '../service-api';
import common from '../components/common.json';

const cardsContainer = document.querySelector('.cards-container-js');
const like = document.querySelector('like-btn');

const recipes = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
cardsContainer.addEventListener('click', handlerAdd);
console.log(recipes);
let arrRecipe;

getAllRecipes()
  .then(data => {
    arrRecipe = data.results;
  })
  .catch(err => {
    console.log(err);
  });

function handlerAdd(evt) {
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  const cardId = evt.target.dataset.id;

  const currentRecipe = arrRecipe.find(({ _id }) => _id === cardId);

  const idx = recipes.findIndex(({ _id }) => _id === cardId);
  console.log(idx);

  // Якщо індекса не знайдено в localStorage
  if (idx === -1) {
    recipes.push(currentRecipe);
    evt.target.classList.add('liked');
  } else {
    recipes.splice(idx, 1);
    evt.target.classList.remove('liked');
  }
  localStorage.setItem(common.LS_RECIPES, JSON.stringify(recipes));
}
