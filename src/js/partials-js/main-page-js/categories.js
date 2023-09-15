import axios from 'axios';
import Notiflix from 'notiflix';



const category_url = 'https://tasty-treats-backend.p.goit.global/api/categories';
axios.get(category_url).then(response => {
  const recipes = document.querySelector('.nav-scroller');
  const recipes_markup = response.data
    .map(
      category => `<li>
      <button class="category-button" href="#">${category.name}</button>
      </li>`
    )
    .join('');
  recipes.innerHTML = recipes_markup;

});