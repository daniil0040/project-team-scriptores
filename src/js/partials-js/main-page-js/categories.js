import { getAllSomething } from "../service-api";


// Це не потрібні імпорти
// import axios from 'axios';
// import Notiflix from 'notiflix';

console.log(getAllSomething);

//const category_url = 'https://tasty-treats-backend.p.goit.global/api/categories';
getAllSomething('categories').then(response => {
  const recipes = document.querySelector('.category-list');
  const recipes_markup = response.data
    .map(
      category => `<li>
      <button class="category-button" href="#">${category.name}</button>
      </li>`
    )
    .join('');
  recipes.innerHTML = recipes_markup;

});



/* 
const category_url = 'https://tasty-treats-backend.p.goit.global/api/categories';
axios.get(category_url).then(response => {
  const recipes = document.querySelector('.category-list');
  const recipes_markup = response.data
    .map(
      category => `<li>
      <button class="category-button" href="#">${category.name}</button>
      </li>`
    )
    .join('');
  recipes.innerHTML = recipes_markup;

});  */