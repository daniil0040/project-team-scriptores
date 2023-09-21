import { createAllCategCardsMarkup, fillStars } from './all-categ-cards';
import { getAllRecipes } from '../service-api';
import { cardsContainer } from './categories';
import { resetPrev } from './categories';

export const buttonAllCategories = document.querySelector('.all-categories');

const auditAllCateg = function () {
  if (buttonAllCategories.classList.contains('all-categories-button-active')) {
    resetPrev();
    buttonAllCategories.classList.remove('all-categories-button-active');
    getAllRecipes()
      .then(data => {
        cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
        fillStars();
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    return;
  }
};

buttonAllCategories.addEventListener('click', auditAllCateg);
