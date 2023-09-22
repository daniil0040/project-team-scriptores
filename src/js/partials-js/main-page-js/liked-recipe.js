import { getRecipeById } from '../service-api';
import common from '../components/common.json';

const cardsContainer = document.querySelector('.cards-container-js');

let recipesFavorite = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
// слухач події на клік по лайку
cardsContainer.addEventListener('click', onClickHeart);

// Код, який виконується після того, як сторінка повністю завантажилася
window.onload = function () {
  const likeBtn = document.querySelectorAll('.js-add');
  restoreLikeStates(likeBtn);
};
// перед завантаженням сторінки перевірка чи лайкнуті картки
export function restoreLikeStates(buttons) {
  buttons.forEach(button => {
    const recipeId = button.dataset.id;
    if (recipesFavorite.some(({ _id }) => _id === recipeId)) {
      button.classList.add('liked');
    }
  });
}

function onClickHeart(evt) {
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  const recipeLikeId = evt.target.dataset.id;
  const recipeLikeBtn = evt.target;
  getRecipeAndUpdateFavorite(recipeLikeId, recipeLikeBtn);
}

async function getRecipeAndUpdateFavorite(id, recipeLikeBtn) {
  try {
    const data = await getRecipeById(id);

    addOrRemoveFavorite(data, recipeLikeBtn);
  } catch (error) {
    console.log(error);
  }
}
// Додавання в local storage
function addOrRemoveFavorite(objRecipe, recipeLikeBtn) {
  const idx = recipesFavorite.findIndex(({ _id }) => _id === objRecipe._id);

  if (idx === -1) {
    recipesFavorite.push(objRecipe);
    recipeLikeBtn.classList.add('liked');
  } else {
    recipesFavorite.splice(idx, 1);
    recipeLikeBtn.classList.remove('liked');
  }
  localStorage.setItem(common.LS_RECIPES, JSON.stringify(recipesFavorite));
}
