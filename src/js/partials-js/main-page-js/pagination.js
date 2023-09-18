import { getAllRecipes } from '../service-api';
import { addPagination, createAllCategCardsMarkup } from './all-categ-cards';

document.addEventListener('click', async e => {
  const button = e.target.closest('.pag-btn-number');

  if (button) {
    const pageNumber = button.getAttribute('page-number');
    let category = document.querySelector('[active="true"]');
    let categoryValue;

    if (category) {
      categoryValue = category.textContent;
    }

    const data = await getAllRecipes(categoryValue, pageNumber);
    const recipes = createAllCategCardsMarkup(data.results);
    addPagination(data, pageNumber);

    document.querySelector('.cards-container-js').innerHTML = recipes;
  }
});
