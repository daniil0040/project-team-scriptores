import { getAllRecipes } from '../service-api';
import { addPagination, createAllCategCardsMarkup } from './all-categ-cards';

document.addEventListener('click', async e => {
  const button = e.target.closest('.pag-btn-number');

  if (button) {
    const pageNumber = button.getAttribute('page-number');

    const data = await getAllRecipes(null, pageNumber);
    const recipes = createAllCategCardsMarkup(data.results);
    const pagination = addPagination(data, pageNumber);
    const cardsContainerHtml = recipes + pagination;

    document.querySelector('.cards-container-js').innerHTML =
      cardsContainerHtml;
  }
});
