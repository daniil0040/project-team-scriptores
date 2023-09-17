// НЕ ЗАБУДЬ ЗРОБИТИ ІМЕНОВАНИЙ ІМПОРТ ТА ЕКСПОРТ Ф-ЦІЇ ДО ФАЙЛУ main.js!!!!
// Створи обʼєкт з усіма ендпоінтами для використання в ф-ції
import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
let url;
//////////// Базовый fetch запрос //////////////

const fetchBaseFuction = async url => {
  try {
    if (url === undefined) {
      throw new Error(`Bad Request`);
    }
    let response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Запрос неудачен с HTTP статусом ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }

  // let response = await fetch(url)
};

//////////// Запрос на Popular Recipes, на рецепты из всех категорий или из конкретной категории(В параметре нужно передать название категории с большой буквы!) //////////////

export const getAllRecipes = async (category, pageNumber = 1) => {
  if (!category) {
    url = `${BASE_URL}/recipes?page=${pageNumber}&limit=9`;
  } else {
    url = `${BASE_URL}/recipes?category=${category}&limit=9&page=${pageNumber}`;
    if (category === 'Popular') url = `${BASE_URL}/recipes/popular`;
  }

  const answer = await fetchBaseFuction(url);
  return answer;
};

// getAllRecipes("Popular").then(data => {
//     console.log(data);
// })

// getAllRecipes("Popular")

//////////// Запрос на мастер-классы для Swiper, на все категории, на все ингридиенты для select и на все регионы для select //////////////

// 'events'
// 'ingredients'
// 'areas'
// 'categories'

export const getAllSomething = async point => {
  if (point === 'events') {
    url = `${BASE_URL}/events`;
  } else if (point === 'ingredients') {
    url = `${BASE_URL}/ingredients`;
  } else if (point === 'areas') {
    url = `${BASE_URL}/areas`;
  } else if (point === 'categories') {
    url = `${BASE_URL}/categories`;
  }

  const answer = await fetchBaseFuction(url);
  return answer;
};

//////////// Запрос на рецепт по айди //////////////

export const getRecipeById = async id => {
  url = `${BASE_URL}/recipes/${id}`;

  const answer = await fetchBaseFuction(url);
  return answer;
};

// getRecipeById("6462a8f74c3d0ddd28897fc1")
