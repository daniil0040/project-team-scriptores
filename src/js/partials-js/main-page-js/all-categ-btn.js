import {
  addPagination,
  createAllCategCardsMarkup,
  fillStars,
} from './all-categ-cards';
import { getAllRecipes } from '../service-api';
import { cardsContainer } from './categories';
import { resetPrev } from './categories';
import common from '../components/common.json';
import { restoreLikeStates } from '../main-page-js/liked-recipe';
import { removeCatListStyle } from './categories';

let recipesFavorite = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
export const buttonAllCategories = document.querySelector('.all-categories');

const auditAllCateg = function () {
  if (buttonAllCategories.classList.contains('all-categories-button-active')) {
    resetPrev();
    buttonAllCategories.classList.remove('all-categories-button-active');
    getAllRecipes()
      .then(data => {
        cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);

        const likeButtons = document.querySelectorAll('.js-add');
        // перед завантаженням перевірка чи лайкнуті картки
        restoreLikeStates(likeButtons);
        addPagination(data);
        fillStars();
        removeCatListStyle();
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    return;
  }
};

buttonAllCategories.addEventListener('click', auditAllCateg);
