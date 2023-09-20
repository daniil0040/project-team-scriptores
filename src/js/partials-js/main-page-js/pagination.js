import { getAllRecipes } from '../service-api';
import { addPagination, createAllCategCardsMarkup } from './all-categ-cards';
import { getRecipesByFilters, serviceGetByKeyWord } from './search-filter';

document.addEventListener('click', async e => {
  const button = e.target.closest('.pag-btn-number');

  if (button) {
    const pageNumber = button.getAttribute('page-number');

    let keyWord = document.getElementById('search').value.trim();

    let currentCategory = '';
    let category = document.querySelector('[active="true"]');
    if (category) {
      currentCategory = category.textContent;
    }

    let currentCookingTime = document.querySelector('.js-time-select').value;
    let currentArea = document.querySelector('.js-area-select').value;
    let currentIngridient = document.querySelector(
      '.js-ingredients-select'
    ).value;

    const data = await getRecipesByFilters(
      pageNumber,
      currentCategory,
      currentCookingTime,
      currentArea,
      currentIngridient,
      keyWord
    );

    if (!data) {
      return;
    }

    const recipes = createAllCategCardsMarkup(data.results);
    addPagination(data, pageNumber);

    document.querySelector('.cards-container-js').innerHTML = recipes;
  }
});
