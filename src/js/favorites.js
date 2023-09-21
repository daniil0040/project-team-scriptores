import './partials-js/menu';
import common from '../js/partials-js/components/common.json';
import { createAllCategCardsMarkup, fillStars } from './partials-js/main-page-js/all-categ-cards';

let cardArr = JSON.parse(localStorage.getItem(common.LS_RECIPES)) ?? [];

const favEmpty = document.querySelector('.fav-empty');
const favContainer = document.querySelector('.fav-container');
const favCategories = document.querySelector('.fav-categories');
const favStatic = document.querySelector('.fav-static')

startFavorite();

function startFavorite() {
    if (cardArr.length) {
        favEmpty.classList.add('is-none');
        createFavoriteMarkUP();
        creatCategoriesList();

        removeCard();

    } else return;
};

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

    categoriesBtn.forEach(button => {
        button.addEventListener('click', function (event) {
            const dataValue = event.currentTarget.getAttribute('data-button');
            if (dataValue === "All categories") {
                createFavoriteMarkUP();
            } else createCardsCategory(dataValue);
        
        });
    })
};

function createCardsCategory(category) {
  const newCardArr = cardArr.filter(obj => obj.category === category);
    favContainer.innerHTML = createAllCategCardsMarkup(newCardArr);

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
    favContainer.innerHTML = createAllCategCardsMarkup(cardArr);
    fillStars()
    filledHearts();
    if (favStatic.classList.contains('fav-phantom')) {
        favStatic.classList.remove('fav-phantom');
        favContainer.classList.remove('fav-style-reset');
    }
    return;
};

function removeCard() {

    favContainer.addEventListener('click', (event) => {
        if (!event.target.classList.contains('js-add')) {
            return;
        }
        const cardId = event.target.dataset.id;
        const idx = cardArr.findIndex(({ _id }) => _id === cardId);
        cardArr.splice(idx, 1);
        localStorage.setItem(common.LS_RECIPES, JSON.stringify(cardArr));
        createFavoriteMarkUP();
        creatCategoriesList();
        if (!cardArr.length) {
            favEmpty.classList.remove('is-none');
            favStatic.classList.add('fav-phantom');
            favContainer.classList.add('fav-style-reset')
            favCategories.innerHTML = "";
        }
    }); 
};

export function filledHearts() {
    const likes = document.querySelectorAll('.js-add');
    likes.forEach(like => like.classList.add('liked'));
}

// SEE RECIPE
import { } from './partials-js/favorites-page-js/see-recipe-fav';

// SWITCHER
import './partials-js/main-page-js/switcher-theme';

// SCROLL UP
import './partials-js/components/scroll-up';
