import { getAllSomething } from "../service-api"
const recipes = document.querySelector('.category-list-js');
getAllSomething('categories').then(data => {
    recipes.insertAdjacentHTML('beforeend', createCategoriesMarkup(data))
    function createCategoriesMarkup() {
        return data.map(({ _id, name }) =>
            `<li>
            <button id="${_id}" class="category-button">${name}</button>
            </li>`
        )
            .join('');
    }
});




//Додаткові методи(функції) які також працюють 	

/*const category_url = 'https://tasty-treats-backend.p.goit.global/api/categories';
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
  
  });*/


  /*
getAllSomething("categories")
    .then(data => {
    recipes.insertAdjacentHTML('beforeend', recipesMarkup(data)) 
})
    .catch(err => {
        console.log(err);
    })

function recipesMarkup(data) {
    return data.map(({ _id, name }) =>
         `<li>
            <button id="${_id}" class="category-button">${name}</button>
            </li>
    ).join('');
}*/