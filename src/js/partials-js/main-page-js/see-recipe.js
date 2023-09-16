import * as basicLightbox from 'basiclightbox';
// import "basicLightbox/dist/basicLightbox.min.css";
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

        const { thumb, title, rating, time, instructions, ingredients, tags, youtube, } = card;
        const ingMark = ingredients.map(({ name, measure }) => `<li class="ing-item">
    <p class="ing-name">${name}</p>
    <p class="ing-measure">${measure}</p>
    </li>`).join('');
        const tagMark = tags.map((tag) => `<li class="tags-item">
    <p class="tags-name">#${tag}</p>
    </li>`).join('');
        console.log(tagMark)
       


        const instance = basicLightbox.create(`<div class="modal"><div class="img-title-box"><img src="${thumb}" alt="${title}" class="modal-img">

    <h1 class="modal-title">${title}</h1></div>
    <div class="raiting-time-box">
    <p class="raiting">${rating}</p>
    <p class="time">${time} min</p>
    </div>
    <ul class="ing-list list">${ingMark}</ul>
    <ul class="tags-list list">${tagMark}</ul>
    <p class="instruction">${instructions}</p>
    <button type="button" class="modal-close-btn js-modal-close">
    <svg class="modal-close" width="20" height="20">
        <use href="img/sprite/icons.svg#icon-close-x"></use>
    </svg>
    </button>
    <div class="button-block">
    <button class="btn add-to-favorite" type="button">Add to favorite</button>
    <button class="btn order-now js-rating-btn" type="button">Give a rating</button>
    </div>
    </div>`);
        instance.show();
        
    const closeModal = document.querySelector('.js-modal-close');

        closeModal.addEventListener('click', clickClose);
        document.addEventListener('keydown', closeEscape);

    function closeEscape(event) {
       if (event.code === "Escape") {
    instance.close();
    document.removeEventListener('keydown', closeEscape);
  }

}
    function clickClose(){
        instance.close();
        document.removeEventListener('click', clickClose);
    }

    } catch (error) {
        console.log(error);
    }
};


