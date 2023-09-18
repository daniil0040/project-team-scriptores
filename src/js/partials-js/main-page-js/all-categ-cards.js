import { getAllRecipes } from '../service-api';
const cardsContainer = document.querySelector('.cards-container-js');

getAllRecipes()
  .then(data => {
    cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
    const recipes = createAllCategCardsMarkup(data.results);
    cardsContainer.innerHTML = recipes;
    addPagination(data);
  })
  .catch(err => {
    console.log(err);
  });

export function createAllCategCardsMarkup(arr) {
  return arr
    .map(({ preview, title, description, rating, _id, tags }) => {
      return `
    <li class="recipes-card" data-tags="${tags}" >
        
      <img class="recipes-img" src="${preview}" alt="${title}" />
      <div class="card-description">
        <button class="like-btn" type="button">
          <svg class="like-logo liked" width="22" height="22">
            <use href="/src/img/sprite/icons.svg#heart"></use>
          </svg>
        </button>
        <h2 class="card-heading">${title}</h2>
        <div class="text-container">
          <p class="card-text">
            ${description}
          </p>
        </div>

        <div class="rating">
        
          <span class="number-rating">${Math.round(rating)}</span>
          <div class="reting-item filled" data-item-value="">
            <svg class="one" width="18" height="18">
              <use href=".img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="./src/img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item filled" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
          <div class="reting-item" data-item-value="">
            <svg class="" width="18" height="18">
              <use href="img/sprite/icons.svg#icon-star-j"></use>
            </svg>
          </div>
     <button class="btn-see-recipe btn-see-recipe-js" type="button" data-id= "${_id}">See recipe</button>

          </div>
    </li>
    `;
    })
    .join('');
}

export function addPagination(results, pageNumber = 1) {
  const totalPages = Number(results.totalPages);
  const currentPage = Number(results.page);
  const firstPage = getFirstPage(totalPages, currentPage);
  const lastPage = Number(firstPage) + 2;

  if (totalPages === 1) {
    return (document.getElementById('pagination').innerHTML = '');
  }

  const previousButtons = renderPreviousButtons(currentPage);
  const buttons = mainButtons(firstPage, lastPage, totalPages, pageNumber);
  const nextButtons = renderNextButtons(currentPage, totalPages);

  const paginationHtml = `<div class="pagination-bar">
    <div class="pag-btn-block">${previousButtons}</div>
    <div class="pag-btn-block">${buttons}</div>
    <div class="pag-btn-block">${nextButtons}</div>
  </div>`;

  document.getElementById('pagination').innerHTML = paginationHtml;
}

function renderPreviousButtons(currentPage) {
  const previousPageNumber = currentPage - 1;
  let clickableClass = 'pag-btn-number';

  if (currentPage === 1) {
    clickableClass = '';
  }

  return `<button
      id="pag-btn-start"
      class="gag-btn-black pag-btn-number"
      type="button"
      aria-label="first page"
      page-number="1"
    >
      <span class="icon-wrap">
        <svg class="pag-btn-left-icon" width="20" height="20">
          <use href="img/sprite/icons.svg#icon-left-two"></use>
        </svg>
      </span>
    </button>
    <button
      id="pag-btn-prev"
      class="gag-btn-black ${clickableClass}"
      type="button"
      aria-label="previous page"
      page-number="${previousPageNumber}"
    >
      <svg class="pag-btn-left-icon" width="20" height="20">
        <use href="img/sprite/icons.svg#icon-left-one"></use>
      </svg>
    </button>`;
}

function renderNextButtons(currentPage, totalPages) {
  const nextPageNumber = currentPage + 1;
  let clickableClass = 'pag-btn-number';

  if (currentPage === totalPages) {
    clickableClass = '';
  }

  return `<button
          id="pag-btn-next"
          class="pag-btn-green ${clickableClass}"
          type="button"
          aria-label="next page"
          page-number="${nextPageNumber}"
        >
          <svg class="pag-btn-right-icon-next" width="20" height="20">
            <use href="img/sprite/icons.svg#icon-arrow"></use>
          </svg>
        </button>
        
        <button
          id="pag-btn-last"
          class="pag-btn-green pag-btn-number"
          type="button"
          aria-label="last page"
          page-number="${totalPages}"
        >
          <span class="icon-container">
            <span class="icon-wrap-right">
              <svg class="pag-btn-right-icon" width="20" height="20">
                <use href="img/sprite/icons.svg#icon-right-two"></use>
              </svg>

          </span>
        </button>`;
}

function getFirstPage(totalPages, currentPage) {
  let firstPage = 1;

  if (currentPage > 1) {
    firstPage = currentPage - 1;
  }

  if (currentPage === totalPages) {
    firstPage = totalPages - 2;
  }

  if (firstPage === 0) {
    firstPage = 1;
  }
  return firstPage;
}

function mainButtons(firstPage, lastPage, totalPages, pageNumber) {
  let buttons = '';
  pageNumber = Number(pageNumber);

  if (pageNumber > 2) {
    buttons += `<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${pageNumber - 2}"
        >
          ...
        </button>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    if (i > totalPages) {
      continue;
    }

    let clickableClass = 'pag-btn-number';
    let active = '';

    if (i == pageNumber) {
      clickableClass = '';
      active = 'active';
    }

    buttons += `<button
          id="pag-btn-${i}"
          class="pag-btn-white ${clickableClass} ${active}"
          type="button"
          aria-label="page ${i}"
          page-number="${i}"
        >
          ${i}
        </button>`;
  }

  if (pageNumber + 2 <= totalPages) {
    buttons += `<button
          id="pag-btn-dots-left"
          class="pag-btn-white pag-btn-number"
          aria-label="more pages"
          page-number="${pageNumber + 2}"
        >
          ...
        </button>`;
  }

  return buttons;
}
