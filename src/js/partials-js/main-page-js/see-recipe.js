import * as basicLightbox from 'basiclightbox';
import "basicLightbox/dist/basicLightbox.min.css";

const seeRecipe = document.querySelector('.resipes-card');

seeRecipe.addEventListener('click', onClickRecipe);


function onClickRecipe(event) {
    if (!event.target.classList.contains('btn-see-recipe')) {
        return;
    };

    
}