import { getRecipeById } from '../service-api';
import common from '../components/common.json';

const cardsContainer = document.querySelector('.cards-container-js');

let recipesFavorite = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
cardsContainer.addEventListener('click', onClickHeart);

async function getCard(id, recipeLikeBtn) {
  try {
    const data = await getRecipeById(id);

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
