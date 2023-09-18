import * as basicLightbox from 'basiclightbox';
// import "basicLightbox/dist/basicLightbox.min.css";
import { getRecipeById } from '../service-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const seeRecipe = document.querySelector('.cards-container-js');
const seeRecipePopular = document.querySelector('.popular-recipes-container');

seeRecipe.addEventListener('click', onClickRecipe);
seeRecipePopular.addEventListener('click', onClickPopular);

function onClickRecipe(event) {
    if (!event.target.classList.contains('btn-see-recipe-js')) {
        return;
    };

    const currentCard = event.target.closest('.btn-see-recipe-js');
    const currentCardId = currentCard.dataset.id;

    getCard(currentCardId);
};

function onClickPopular(event) {
    const currentPopularCard = event.target.closest('.popular-recipes-wrap');
    const currentPopularCardId = currentPopularCard.dataset.id;

    getCard(currentPopularCardId);
}

async function getCard(id) {
    try {
        const card = await getRecipeById(id);
        loadBasicLightbox(card);
    } catch (error) {
        console.log(error);
    }
};

function loadBasicLightbox(card) {
    const instance = basicLightbox.create(createMurkUpModal(card));
    instance.show();

    const video = document.querySelector('.js-modal-video');
    const image = document.querySelector('.js-modal-img');

    checkVideo(card.youtube, video, image);

    const favorite = document.querySelector('.js-favorite-btn');
    favorite.addEventListener('click', () => addFavorite(card));

    const closeModal = document.querySelector('.js-modal-close');

    closeModal.addEventListener('click', () => instance.close());

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape") {
    instance.close();
        };
    });
};

function createMurkUpModal(card) {
    let markUP;
    const { thumb, title, rating, time, instructions, ingredients, tags, youtube, } = card;
    const fixRating = rating.toFixed(1);
    const ingMark = ingredients.map(({ name, measure }) => `<li class="ing-item">
    <p class="ing-name">${name}</p>
    <p class="ing-measure">${measure}</p>
    </li>`).join('');
    let tagMark = tags.map((tag) => `<li class="tags-item">
    <p class="tags-name">#${tag}</p>
    </li>`).join('');
    let ratingStar = createRatingStar(rating);
    let youtubeLink = createYoutubeLink(youtube);

    markUP = (`<div class="modal-box categories-block-modal"><div class="img-title-box"><iframe class="modal-img js-modal-video"  width="295" height="295" src="https://www.youtube.com/embed/${youtubeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     <img src="${thumb}" alt="${title}" class="modal-img js-modal-img is-none" id="fallback-image" width="295" height="295">
    <h1 class="modal-title">${title}</h1></div>
    <div class="desc-box">
    <div class="raiting-time-box">
    <p class="raiting-text">${fixRating}</p>
    <ul class="star-list list">${ratingStar}</ul>
    <p class="time">${time} min</p>
    </div>
    <div class="ing-box">
    <ul class="ing-list list">${ingMark}</ul>
    </div>
    <div class="tags-box">
    <ul class="tags-list list">${tagMark}</ul>
    </div>
    </div>
    <p class="instruction">${instructions}</p>
    <button type="button" class="modal-close-btn js-modal-close">
    <svg class="modal-close" width="20" height="20">
        <use href="img/sprite/icons.svg#icon-close-x"></use>
    </svg>
    </button>
    <div class="button-block">
    <button class="btn add-to-favorite js-favorite-btn" type="button">Add to favorite</button>
    <button class="btn order-now js-rating-btn" type="button">Give a rating</button>
    </div>
    </div>`);
    
        return (markUP);
};

function createRatingStar(rating) {
    const yellowStar = ` <li class="item-star-icon">
        <button class="yellow-star"></button>
    </li>`
    const grayStar = `<li class="item-star-icon" >
        <button class="gray-star"></button>
    </li>`
    const newRating = Math.round(rating);
    let arrStars = [];
    for (let i = 0; i < 5; i++){
        if (i + 1 > newRating) {
            arrStars.push(grayStar);
        } else {
            arrStars.push(yellowStar)
        }
    }
    return arrStars.join('');
    
}

function createYoutubeLink(youtube) {
    let link = youtube;
    let idx = link.indexOf('=');
    if (idx !== -1) {
        let newLink = link.substring(idx + 1);
        return newLink;
    } else return;
}

function checkVideo(tubeLink, video, image) {
    if (!tubeLink) {
        video.classList.add('is-none');
        image.classList.remove('is-none');
    }
    return
}



function addFavorite(card) {
    let existingData = localStorage.getItem("cardData");
    let arrFavorite = existingData ? JSON.parse(existingData) : [];
        const result = arrFavorite.find(({ _id }) => _id === card._id);
        if (!result) {
            arrFavorite.push(card);
            
        } else {
            Notify.failure('This recipe has already been added to your favorites');
            return
    } 
    let jsonData = JSON.stringify(arrFavorite)
            localStorage.setItem("cardData", jsonData);
}

