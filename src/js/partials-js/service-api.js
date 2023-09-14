// НЕ ЗАБУДЬ ЗРОБИТИ ІМЕНОВАНИЙ ІМПОРТ ТА ЕКСПОРТ Ф-ЦІЇ ДО ФАЙЛУ main.js!!!!
// Створи обʼєкт з усіма ендпоінтами для використання в ф-ції
import axios from "axios";

const BASE_URL = "https://tasty-treats-backend.p.goit.global/api"
let url
let pageNumber = 0
//////////// Базовый fetch запрос //////////////

 const fetchBaseFuction = async (url) => {
    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error(response.statusText)
        const recipes = await response.json();
        console.log(recipes);
    }
    catch (error) {
        console.log(error);
    }
}

////////////////////////////////////////////////



//////////// Запрос на Popular Recipes, на рецепты из всех категорий или из конкретной категории(В параметре нужно передать название категории с большой буквы!) //////////////

export const getAllRecipes = async (category) => {
    pageNumber += 1
    if (!category) {
         url = `${BASE_URL}/recipes&page=${pageNumber}&limit=9`
    } else {
        url = `${BASE_URL}/recipes?category=${category}&limit=9&page=${pageNumber}`
        if(category === "Popular")   url = `${BASE_URL}/recipes/popular`
    }

    await fetchBaseFuction(url)
}

getAllRecipes("Dessert")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////// Запрос на название всех категорий //////////////

export const getAllCategories = async () => {
    url = `${BASE_URL}/categories`
    
    await fetchBaseFuction(url)
}

getAllCategories()

////////////////////////////////////////////////////////////




//////////// Запрос на мастер-классы для Swiper //////////////

export const getAllEventsForSwiper = async () => {
    url = `${BASE_URL}/events`
    
    await fetchBaseFuction(url)
}

getAllEventsForSwiper()

//////////////////////////////////////////////////////////////