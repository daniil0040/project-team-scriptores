import axios from 'axios';
import Notiflix from 'notiflix';
import { createAllCategCardsMarkup } from './all-categ-cards';
// import debounce from "lodash.debounce";

const selectors = {
  areaSelect: document.querySelector('.js-area-select'),
  ingredientsSelect: document.querySelector('.js-ingredients-select'),
  searchInput: document.querySelector('#search'),
  categoryList: document.querySelector('.category-list-js'),
  cardsContainer: document.querySelector('.cards-container-js'),
  allCategoryBtn: document.querySelector('.all-categories-js'),
};
let currentCategory = '';

selectors.categoryList.addEventListener('click', hendlerClickCategories);

// selectors.searchInput.addEventListener('input', debounce(handlerInput, 300));

selectors.allCategoryBtn.addEventListener('click', hendlerClickAllCategBtn);

function hendlerClickAllCategBtn(evt) {
  currentCategory = '';
}

function hendlerClickCategories(evt) {
  if (!evt.target.classList.contains('category-button-js')) {
    return;
  }
  currentCategory = evt.target.textContent;
}

async function handlerInput(evt) {
  const keyWord = evt.target.value.trim();
  if (keyWord === '') {
    const defaultData = await serviceGetByKeyWord(currentCategory);
    return (selectors.cardsContainer.innerHTML =
      createAllCategCardsMarkup(defaultData));
  }
  try {
    const data = await serviceGetByKeyWord(currentCategory, keyWord);
    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(data);
  } catch (error) {
    console.log(error);
  }
}

async function serviceGetByKeyWord(currentCategory = '', keyWord = '') {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      limit: 9,
      category: currentCategory,
      title: `${keyWord}`,
    },
  });
  const recipes = response.data.results;
  if (recipes.length === 0) {
    selectors.cardsContainer.innerHTML = '';
    throw Error(
      Notiflix.Notify.failure(
        'Sorry, there are no recipes matching your search query. Please try again.'
      )
    );
  }
  return recipes.map(({ preview, title, description, rating, _id, tags }) => {
    return { preview, title, description, rating, _id, tags };
  });
}
