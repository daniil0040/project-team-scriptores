import { getAllRecipes } from '../service-api';
export const cardsContainer = document.querySelector('.cards-container-js');
 let slicesArrForMarkUp 
getAllRecipes()
  .then(data => {
    cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
    fillStars();
    const recipes = createAllCategCardsMarkup(data.results);
    cardsContainer.innerHTML = recipes;
    fillStars();
    addPagination(data);
  })
  .catch(err => {
    console.log(err);
  });

export function createAllCategCardsMarkup(arr, isFromFavorite) {
  slicesArrForMarkUp = arr
  if (window.innerWidth > 0 && !isFromFavorite) {
    slicesArrForMarkUp = arr.slice(0, 6) 
    } 
  if (window.innerWidth >= 768 && !isFromFavorite)  {
    slicesArrForMarkUp = arr.slice(0, 8)
    }
  if (window.innerWidth >= 1280 && !isFromFavorite)  {
    slicesArrForMarkUp = arr.slice(0, 9) 
  }
  return slicesArrForMarkUp
    .map(({ preview, title, description, rating, _id, tags }) => {
      return `
    <li class="recipes-card" data-tags="${tags}" >
        
      <img class="recipes-img" src="${preview}" alt="${title}" />
      <div class="card-description">
        <button aria-label="Like Recipe" class="like-btn icon-heart  js-add" data-id="${_id}" type="button"></button>
        <h2 class="card-heading">${title}</h2>
        <div class="text-container">
          <p class="card-text">
            ${description}
          </p>
        </div>

        <div class="rating">
        
          <span class="number-rating">${rating.toFixed(1)}</span>
          <div class="reting-item" data-item-value="" id="all-stars">
            
          </div>
          <div class="reting-item" data-item-value="" id="all-stars">
            
          </div>
          <div class="reting-item" data-item-value="" id="all-stars">
            
          </div>
          <div class="reting-item" data-item-value="" id="all-stars">
            
          </div>
          <div class="reting-item"  data-item-value="" id="all-stars">
            
          </div>
     <button class="btn-see-recipe btn-see-recipe-js" type="button" data-id= "${_id}">See recipe</button>

          </div>
    </li>
    `;
    })
    .join('');
}

export function fillStars() {
  const starRatings = document.querySelectorAll('.rating');
  starRatings.forEach(starRating => {
    const rating = starRating.firstElementChild.innerHTML;

    const roundedRating = Math.round(rating);

    const stars = starRating.querySelectorAll('#all-stars');

    stars.forEach((star, index) => {
      if (index < roundedRating) {
        star.classList.add('filled');
      }
    });
  });
  return;
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
      <span class="icon-wrap left-double"></span>
    </button>

    <button
      id="pag-btn-prev"
      class="gag-btn-black ${clickableClass}"
      type="button"
      aria-label="previous page"
      page-number="${previousPageNumber}"
    >
    <span class="icon-wrap left-single"></span>
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
         <span class="icon-wrap-right right-single"></span>
        </button>
        
        <button
          id="pag-btn-last"
          class="pag-btn-green ${clickableClass}"
          type="button"
          aria-label="last page"
          page-number="${totalPages}"
        >
        <span class="icon-wrap-right right-double"></span>
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

  if (pageNumber > 2 && totalPages > 3) {
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

  if (pageNumber + 2 <= totalPages && totalPages > 3) {
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
