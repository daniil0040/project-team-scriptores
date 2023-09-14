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

// getAllRecipes("Dessert")


//////////// Запрос на мастер-классы для Swiper, на все ингридиенты для select и на все регионы для select //////////////

// 'events'
// 'ingredients'
// 'areas'
// 'categories'


export const getAllSomething = async (point) => {
    if (point === "events") {
        url = `${BASE_URL}/events`
    }
    if (point === "ingredients") {
        url = `${BASE_URL}/ingredients`
    }
    if (point === "areas") {
        url = `${BASE_URL}/areas`
    }
    if (point === "categories") {
        url = `${BASE_URL}/categories`
    }

    
    await fetchBaseFuction(url)
}

// getAllSomething("events")



//////////// Запрос на рецепт по айди //////////////


export const getRecipeById = async (id) => {
    url = `${BASE_URL}/recipes/${id}`
    
    await fetchBaseFuction(url)
}

// getRecipeById("6462a8f74c3d0ddd28897fc1")


