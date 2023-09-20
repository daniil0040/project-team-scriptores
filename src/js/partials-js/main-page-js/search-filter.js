import axios from 'axios';
import Notiflix from 'notiflix';
import { addPagination, createAllCategCardsMarkup } from './all-categ-cards';
import debounce from 'lodash.debounce';
import { searchTime, searchArea, searchIngredients } from './select';

const selectors = {
  areaSelect: document.querySelector('.js-area-select'),
  ingredientsSelect: document.querySelector('.js-ingredients-select'),
  searchInput: document.querySelector('#search'),
  categoryList: document.querySelector('.category-list-js'),
  cardsContainer: document.querySelector('.cards-container-js'),
  allCategoryBtn: document.querySelector('.all-categories-js'),
  timeSelect: document.querySelector('.js-time-select'),
  resetBtn: document.querySelector('.button-reset-js'),
};
let keyWord = '';
let currentCategory = '';
let currentArea = '';
let currentCookingTime = '';
let currentIngridient = '';

selectors.categoryList.addEventListener('click', hendlerClickCategories);

selectors.searchInput.addEventListener('input', debounce(handlerInput, 300));

selectors.allCategoryBtn.addEventListener('click', hendlerClickAllCategBtn);

selectors.areaSelect.addEventListener('change', handlerAreaSelect);

selectors.ingredientsSelect.addEventListener(
  'change',
  handlerIngridientsSelect
);

selectors.timeSelect.addEventListener('change', handlerTimeSelect);

selectors.resetBtn.addEventListener('click', handlerReset);

async function handlerReset() {
  selectors.searchInput.value = '';
  // AREA RESET
  selectors.areaSelect.selectedIndex = 0;
  searchArea.setSelected('');
  currentArea = '';
  // TIME RESET
  selectors.timeSelect.selectedIndex = 0;
  searchTime.setSelected('');
  currentCookingTime = '';
  // INGREDIENTS RESET
  selectors.ingredientsSelect.selectedIndex = 0;
  searchIngredients.setSelected('');
  currentIngridient = '';

  const defaultData = await serviceGetByKeyWord(currentCategory);
  selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
    defaultData.results
  );
  addPagination(defaultData);
  return;
}

async function handlerAreaSelect(evt) {
  if (evt.target.value === '') {
    return;
  }

  currentArea = evt.target.value;
  try {
    const data = await serviceGetByKeyWord(
      currentCategory,
      currentCookingTime,
      currentArea,
      currentIngridient,
      keyWord
    );
    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
      data.results
    );
    addPagination(data);
  } catch (error) {
    console.log(error);
  }
}

async function handlerIngridientsSelect(evt) {
  if (evt.target.value === '') {
    return;
  }
  currentIngridient = evt.target.value;
  try {
    const data = await serviceGetByKeyWord(
      currentCategory,
      currentCookingTime,
      currentArea,
      currentIngridient,
      keyWord
    );
    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
      data.results
    );
    addPagination(data);
  } catch (error) {
    console.log(error);
  }
}

async function handlerTimeSelect(evt) {
  if (evt.target.value === '') {
    return;
  }

  currentCookingTime = evt.target.value;

  try {
    const data = await serviceGetByKeyWord(
      currentCategory,
      currentCookingTime,
      currentArea,
      currentIngridient,
      keyWord
    );

    if (!data || !data.results) {
      return;
    }

    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
      data.results
    );

    addPagination(data);
  } catch (error) {
    console.log(error);
  }
}

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
  keyWord = evt.target.value.trim();
  if (keyWord === '') {
    const defaultData = await serviceGetByKeyWord(currentCategory);
    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
      defaultData.results
    );
    addPagination(defaultData);
    return;
  }
  try {
    const data = await serviceGetByKeyWord(
      currentCategory,
      currentCookingTime,
      currentArea,
      currentIngridient,
      keyWord
    );

    if (!data.results) {
      return;
    }

    selectors.cardsContainer.innerHTML = createAllCategCardsMarkup(
      data.results
    );
    addPagination(data);
  } catch (error) {
    console.log(error);
  }
}

export async function serviceGetByKeyWord(
  currentCategory = '',
  currentCookingTime = '',
  currentArea = '',
  currentIngridient = '',
  keyWord = ''
) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      limit: 9,
      category: currentCategory,
      title: keyWord,
      time: currentCookingTime,
      area: currentArea,
      ingredient: currentIngridient,
    },
  });
  const recipes = response.data;

  if (recipes.results.length === 0) {
    selectors.cardsContainer.innerHTML = '';
    document.getElementById('pagination').innerHTML = '';

    Notiflix.Notify.failure(
      'Sorry, there are no recipes matching your search query. Please try again.'
    );

    return;
  }

  return recipes;
}

export async function getRecipesByFilters(
  pageNumber = 1,
  currentCategory = '',
  currentCookingTime = '',
  currentArea = '',
  currentIngridient = '',
  keyWord = ''
) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      page: pageNumber,
      limit: 9,
      category: currentCategory,
      title: keyWord,
      time: currentCookingTime,
      area: currentArea,
      ingredient: currentIngridient,
    },
  });
  return response.data;
}
