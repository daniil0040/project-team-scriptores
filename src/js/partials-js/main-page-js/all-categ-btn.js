import { createAllCategCardsMarkup } from "./all-categ-cards"
import { isAllCategories } from "./categories"
import { getAllRecipes } from "../service-api";
import { cardsContainer } from './all-categ-cards';
export const buttonAllCategories = document.querySelector(".all-categories")



const auditAllCateg = function () {
    if (!isAllCategories || buttonAllCategories.classList.contains("all-categories-button-active")) {
        getAllRecipes()
        .then(data => {
            console.log(data)
            cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
            isAllCategories = true;
       
        })
        .catch(error => {
            console.log(error);
        })
    } else {
        buttonAllCategories.classList.add("all-categories-button-active");
        return
    }
}

buttonAllCategories.addEventListener('click', auditAllCateg);
