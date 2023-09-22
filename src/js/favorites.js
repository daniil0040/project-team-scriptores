import './partials-js/menu';
import common from '../js/partials-js/components/common.json';
import {
  createAllCategCardsMarkup,
  fillStars,
} from './partials-js/main-page-js/all-categ-cards';

let butt;
let cardArr = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];
let slicedCardArr;

let pageNumberForPog = 1;
const favEmpty = document.querySelector('.fav-empty');
const favContainer = document.querySelector('.fav-container');
const favCategories = document.querySelector('.fav-categories');
const favStatic = document.querySelector('.fav-static');

startFavorite();

function startFavorite() {
  if (cardArr.length) {
    favEmpty.classList.add('is-none');
    createFavoriteMarkUP();
    creatCategoriesList();

    removeCard();
  } else return;
}

function creatCategoriesList() {
  const targetKey = 'category';
  const newArray = cardArr.map(obj => obj[targetKey]);
  const categoriesSet = new Set(newArray);
  const categoriesArr = [...categoriesSet];
  categoriesArr.unshift('All categories');
  pullOutCategories(categoriesArr);
}

function pullOutCategories(categoriesArr) {
  favCategories.innerHTML = markUpCategoriesBtn(categoriesArr);
    const categoriesBtn = document.querySelectorAll('.js-category-btn');
    categoriesBtn[0].classList.add('fav-btn-active');

  categoriesBtn.forEach(button => {
    button.addEventListener('click', function (event) {
      const dataValue = event.currentTarget.getAttribute('data-button');
      if (dataValue === 'All categories') {
        createFavoriteMarkUP();
        } else createCardsCategory(dataValue);
        
        categoriesBtn.forEach(buttonNotActive => {

        console.log(buttonNotActive.classList.contains('fav-btn-active'));

        if (buttonNotActive.classList.contains('fav-btn-active')) {
            buttonNotActive.classList.remove('fav-btn-active');
        }
    }
    )
    
    button.classList.add('fav-btn-active');
    });
  });
}

function createCardsCategory(category) {
  const newCardArr = cardArr.filter(obj => obj.category === category);
  document.getElementById('paginationFAV').innerHTML = '';
  favContainer.innerHTML = createAllCategCardsMarkup(newCardArr, true);

  fillStars();
  filledHearts();
}

export function markUpCategoriesBtn(arr) {
  return arr
    .map(
      el =>
        `<button class="category-btn js-category-btn" data-button="${el}">${el}</button>`
    )
    .join('');
}

function createFavoriteMarkUP() {
  if (cardArr.length > 12 && window.innerWidth > 767) {
    slicedCardArr = cardArr.slice(0, 12);
    favContainer.innerHTML = createAllCategCardsMarkup(slicedCardArr, true);
    addPaginationFavorite(cardArr);
  } else if (cardArr.length > 9 && window.innerWidth <= 767) {
    slicedCardArr = cardArr.slice(0, 9);
    favContainer.innerHTML = createAllCategCardsMarkup(slicedCardArr, true);
    addPaginationFavorite(cardArr);
  } else {
    document.getElementById('paginationFAV').innerHTML = '';
    favContainer.innerHTML = createAllCategCardsMarkup(cardArr, true);
  }

  fillStars();
  filledHearts();
  if (favStatic.classList.contains('fav-phantom')) {
    favStatic.classList.remove('fav-phantom');
    favContainer.classList.remove('fav-style-reset');
  }
  return;
}

// PAGINATION

function addPaginationFavorite(results, pageNumber = pageNumberForPog) {
  const totalPages = Math.ceil(results.length / 12);
  const currentPage = pageNumber;
  const firstPage = getFirstPageFAV(totalPages, currentPage);

  const lastPage = Number(firstPage) + 2;
  if (totalPages === 1) {
    return (document.getElementById('paginationFAV').innerHTML = '');
  }

  const previousButtons = renderPreviousButtonsFAV(currentPage);
  const buttons = mainButtonsFAV(firstPage, lastPage, totalPages, pageNumber);
  const nextButtons = renderNextButtonsFAV(currentPage, totalPages);

  const paginationHtml = `<div class="pagination-bar">
    <div class="pag-btn-block">${previousButtons}</div>
    <div class="pag-btn-block">${buttons}</div>
    <div class="pag-btn-block">${nextButtons}</div>
  </div>`;

  document.getElementById('paginationFAV').innerHTML = paginationHtml;
  fillStars();
  filledHearts();
}

export function renderPreviousButtonsFAV(currentPage) {
  const previousPageNumber = currentPage - 1;

  let clickableClass = 'pag-btn-number';

  if (Number(currentPage) === 1) {
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

export function renderNextButtonsFAV(currentPage, totalPages) {
  const nextPageNumber = Number(currentPage) + 1;
  let clickableClass = 'pag-btn-number';

  if (Number(currentPage) === totalPages) {
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
          class="pag-btn-green pag-btn-number"
          type="button"
          aria-label="last page"
          page-number="${totalPages}"
        >
          <span class="icon-wrap-right right-double"></span>
        </button>`;
}

export function getFirstPageFAV(totalPages, currentPage) {
  let firstPage = 1;

  if (currentPage > 1) {
    firstPage = currentPage - 1;
  }

  if (Number(currentPage) === totalPages) {
    firstPage = totalPages - 2;
  }

  if (firstPage === 0) {
    firstPage = 1;
  }

  return firstPage;
}

export function mainButtonsFAV(firstPage, lastPage, totalPages, pageNumber) {
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

let first = 0;
let last = 12;
let prevPage;
document.addEventListener('click', async e => {
  const button = e.target.closest('.pag-btn-number');

  slicedCardArr = cardSlicing(button);
  if (button) {
    butt = button
    const pageNumber = button.getAttribute('page-number');

    const recipes = createAllCategCardsMarkup(slicedCardArr, true);
    favContainer.innerHTML = recipes
    
    fillStars();
    filledHearts();
    addPaginationFavorite(cardArr, pageNumber);

    // document.querySelector('.cards-container-js').innerHTML = recipes;
  }
});

function cardSlicing(button) {
  if (button === 1) return cardArr.slice(0, 12);
  if (button) prevPage = button.getAttribute('page-number');
  if (cardArr.length > 12 && window.innerWidth > 767) {
    first = 12 * prevPage - 12;
    last = 12 * prevPage;
    return cardArr.slice(first, last);
  }
  first = 9 * prevPage - 9;
  last = 9 * prevPage;
  return cardArr.slice(first, last);
}

function removeCard() {
  favContainer.addEventListener('click', event => {
    if (!event.target.classList.contains('js-add')) {
      return;
    }
    const cardId = event.target.dataset.id;
    const idx = cardArr.findIndex(({ _id }) => _id === cardId);
    // console.log(butt);
    cardArr.splice(idx, 1);
    localStorage.setItem(common.LS_RECIPES, JSON.stringify(cardArr));

    createFavoriteMarkUPsss(butt ?? 1);
    fillStars();
    filledHearts();
    creatCategoriesList();
    if (!cardArr.length) {
      favEmpty.classList.remove('is-none');
      favStatic.classList.add('fav-phantom');
      favContainer.classList.add('fav-style-reset');
      favCategories.classList.add('is-none');
      // favCategories.innerHTML = '';
    }
  });
}

export function filledHearts() {
  const likes = document.querySelectorAll('.js-add');
  likes.forEach(like => like.classList.add('liked'));
}

function createFavoriteMarkUPsss(buttons) {
  if (cardArr.length > 12 && window.innerWidth > 767) {
    if(butt) pageNumberForPog = butt.getAttribute("page-number")
      favContainer.innerHTML = createAllCategCardsMarkup(cardSlicing(buttons ), true)
      addPaginationFavorite(cardArr)

    }

  else if (cardArr.length > 9 && window.innerWidth <= 767) {
      if(butt) pageNumberForPog = butt.getAttribute("page-number")
        favContainer.innerHTML = createAllCategCardsMarkup(cardSlicing(buttons), true)
        addPaginationFavorite(cardArr)
  } 
    
  else {
        document.getElementById('paginationFAV').innerHTML = ''
        favContainer.innerHTML = createAllCategCardsMarkup(cardArr, true);
  }
  
    fillStars();
  filledHearts();

  if (favStatic.classList.contains('fav-phantom')) {
        favStatic.classList.remove('fav-phantom');
        favContainer.classList.remove('fav-style-reset');
  }
  return;
}

// addPagination()

// SEE RECIPE
import {} from './partials-js/favorites-page-js/see-recipe-fav';

// SWITCHER
import './partials-js/main-page-js/switcher-theme';

// SCROLL UP
import './partials-js/components/scroll-up';
