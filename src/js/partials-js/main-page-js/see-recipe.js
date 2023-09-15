import * as basicLightbox from 'basiclightbox';
import "basicLightbox/dist/basicLightbox.min.css";
import { getRecipeById } from '../service-api';

const seeRecipe = document.querySelector('.cards-container-js');

seeRecipe.addEventListener('click', onClickRecipe);


function onClickRecipe(event) {
    if (!event.target.classList.contains('btn-see-recipe-js')) {
        return;
    };

    const currentCard = event.target.closest('.btn-see-recipe-js');
    const currentCardId = currentCard.dataset.id;

    getCard(currentCardId);

};

async function getCard(id) {
    try {
        const card = await getRecipeById(id);
        console.log(card);
    } catch (error) {
        console.log(error);
    }
}