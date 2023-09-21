import { getRecipeById } from '../service-api';
import common from '../components/common.json';

const cardsContainer = document.querySelector('.cards-container-js');

let recipesFavorite = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];

console.log(recipesFavorite);
window.onload = function () {
  // Код, який виконується після того, як сторінка повністю завантажилася
  const likeBtn = document.querySelectorAll('.js-add');
  restoreLikeStates(likeBtn);
  // recipesFavorite.forEach(({ _id }) => updateLikeState(_id));
};

function restoreLikeStates(buttons) {
  console.log(buttons);
  buttons.forEach(button => {
    const recipeId = button.dataset.id;
    if (recipesFavorite.find(({ _id }) => _id === recipeId)) {
      button.classList.add('liked');
    }
  });
}

//   // Отримати потрібний елемент з DOM
//   const element = document.querySelector('.like-btn'); // Замініть '.js-element' на власний селектор

//   if (element) {
//     // Ваш код для роботи з елементом тут
//     console.log('Знайдено елемент:', element);
//   } else {
//     console.log('Елемент не знайдено');
//   }
// });

// function updateLikeState(cardId) {
//   const button = document.querySelector(`[data-id="${cardId}"].js-add`);
//   console.log(button);
//   if (button) {
//     const idx = recipesFavorite.findIndex(({ _id }) => _id === cardId);
//     if (idx !== -1) {
//       button.classList.add('liked');
//     } else {
//       button.classList.remove('liked');
//     }
//   }
// }
cardsContainer.addEventListener('click', onClickHeart);
async function getCard(id, recipeLikeBtn) {
  try {
    const data = await getRecipeById(id);
    console.log(data);
    addFavorite(data, recipeLikeBtn);
  } catch (error) {
    console.log(error);
  }
}

function addFavorite(objRecipe, recipeLikeBtn) {
  const result = recipesFavorite.find(({ _id }) => _id === objRecipe._id);
  const idx = recipesFavorite.findIndex(({ _id }) => _id === objRecipe._id);

  if (!result) {
    recipesFavorite.push(objRecipe);
    recipeLikeBtn.classList.add('liked');
  } else {
    recipesFavorite.splice(idx, 1);
    recipeLikeBtn.classList.remove('liked');
  }
  localStorage.setItem(common.LS_RECIPES, JSON.stringify(recipesFavorite));
}

function onClickHeart(evt) {
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  const recipeLikeId = evt.target.dataset.id;
  const recipeLikeBtn = evt.target;
  getCard(recipeLikeId, recipeLikeBtn);
}
