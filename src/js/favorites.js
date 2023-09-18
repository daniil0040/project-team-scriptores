import './partials-js/menu';
import { createAllCategCardsMarkup } from './partials-js/main-page-js/all-categ-cards';

let cardArr = JSON.parse(localStorage.getItem('cardData')) ?? [];

const favEmpty = document.querySelector('.fav-empty');
const favContainer = document.querySelector('.fav-container');
const favCategories = document.querySelector('.fav-categories');
const deleteLS = document.querySelector('.delete');

deleteLS.addEventListener('click', () => localStorage.clear());
startFavorite();

console.log(cardArr);
function startFavorite() {
    if (!cardArr.length) {
        return;
    } else {
       favEmpty.classList.add('is-none');
        createFavoriteMarkUP();
        creatCategoriesList()
    };
};

function creatCategoriesList() {
    const targetKey = 'category';
    const newArray = cardArr.map((obj) => obj[targetKey]);
    const categoriesSet = new Set(newArray);
    const categoriesArr = [...categoriesSet];
    categoriesArr.unshift("All categories");
    pullOutCategories(categoriesArr);
}

function pullOutCategories(categoriesArr) {
    favCategories.innerHTML = markUpCategoriesBtn(categoriesArr);
    const categoriesBtn = document.querySelectorAll('.js-category-btn');

    categoriesBtn.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
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
}


function markUpCategoriesBtn(arr) {
    return arr.map((el) => `<button class="category-btn js-category-btn" data-button="${el}">${el}</button>`).join('');
}

function createFavoriteMarkUP() {
    favContainer.innerHTML = createAllCategCardsMarkup(cardArr);
    return;
};



