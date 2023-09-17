import { createAllCategCardsMarkup } from "./all-categ-cards"
import { isAllCategories } from "./categories"
import { getAllRecipes } from "../service-api";
import { cardsContainer } from './categories';
export const buttonAllCategories = document.querySelector(".all-categories")


buttonAllCategories.addEventListener("click", displayAllCategories)

function displayAllCategories() {
    if (isAllCategories || buttonAllCategories.classList.contains("all-categories-button-active")) {
        return

    } else {
        getAllRecipes("").then(data => {
            buttonAllCategories.classList.add("all-categories-button-active")
            cardsContainer.innerHTML = createAllCategCardsMarkup(data.results)
        })
        .catch(err => {
        console.log(err);
        })
    
    }
}
