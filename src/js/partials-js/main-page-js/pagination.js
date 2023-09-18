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
    console.log(data);
    const recipes = createAllCategCardsMarkup(data.results);
    const pagination = addPagination(data, pageNumber);

    const cardsContainerHtml = recipes + pagination;

    document.querySelector('.cards-container-js').innerHTML =
      cardsContainerHtml;
  }
});
