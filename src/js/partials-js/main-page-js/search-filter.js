import axios from "axios";
import Notiflix from 'notiflix';
import {createAllCategCardsMarkup} from "./all-categ-cards"
import { getAllSomething } from "../service-api"

const cardsContainer = document.querySelector('.cards-container-js');

const selectors = {
    areaSelect: document.querySelector(".js-area-select"),
    ingredientsSelect: document.querySelector(".js-ingredients-select"),
    searchInput: document.querySelector("#search")
}
// console.log(selectors.searchInput);
// getAllSomething("areas")
//     .then(data =>
//         selectors.areaSelect.insertAdjacentHTML("beforeend",createAreasSelectMarkup(data))
// )
function createAreasSelectMarkup(arr){
    return arr.map(({name})=> `<option value="${name}">${name}</option>`).join("")
}

selectors.searchInput.addEventListener("input", handlerInput)
async function handlerInput(evt) {
    const keyWord = evt.target.value.trim()
    if (keyWord === "") {
        return
    }
    try {
        const data = await serviceGetByKeyWord(`${keyWord}`)
        console.log(data);
        // cardsContainer.insertAdjacentHTML("beforeend",createAllCategCardsMarkup(data))
    } catch (error) {
        console.log(error);
    }
}

async function serviceGetByKeyWord(keyWord) {
    const BASE_URL = "https://tasty-treats-backend.p.goit.global/api/recipes"
    const response = await axios.get(`${BASE_URL}`,{
    params: {
            query: keyWord,
        limit: 9 
    }
    })
    const recipes = response.data.results;
    if (recipes.length === 0) {
        throw Error(Notiflix.Notify.failure('Sorry, there are no recipes matching your search query. Please try again.'));
    }
    return recipes.map(({preview, title, description, rating, _id, tags}) => {
        return {preview, title, description, rating, _id, tags}
    })
}
