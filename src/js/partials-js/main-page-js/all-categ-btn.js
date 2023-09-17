import { createAllCategCardsMarkup } from "./all-categ-cards"
import { isAllCategories } from "./categories"
import { getAllRecipes } from "../service-api";
import { cardsContainer } from './categories';
export const buttonAllCategories = document.querySelector(".all-categories")



const auditAllCateg = function () {
    if (!isAllCategories) {
        getAllRecipes()
        .then(data => {
            console.log(data)
            cardsContainer.innerHTML = createAllCategCardsMarkup(data.results);
            isAllCategories = true;
       
        })
        .catch(error => {
            console.log(error);
        })
    }return
}

buttonAllCategories.addEventListener('click', auditAllCateg);