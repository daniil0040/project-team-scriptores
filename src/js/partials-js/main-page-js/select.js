import SlimSelect from 'slim-select';
import { getAllSomething } from '../service-api';

export let searchTime = null;
export let searchArea = null;
export let searchIngredients = null;

// TIME
const arr = [];
for (let i = 5; i <= 120; i += 5) {
  arr.push({
    html: `<p>${i} min</p>`,
    text: `${i}`,
    value: `${i}`,
  });
}
arr.unshift({ text: '', placeholder: true });

searchTime = new SlimSelect({
  select: '.js-time-select',
  settings: {
    showSearch: false,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Time',
  },
  data: arr,
});

// AREAS
getAllSomething('areas')
  .then(data => {
    let arr = data.map(({ name }) => ({
      html: `<p>${name}</p>`,
      text: `${name}`,
      value: `${name}`,
    }));
    arr.unshift({ text: '', placeholder: true });
    searchArea = new SlimSelect({
      select: '.js-area-select',

      settings: {
        showSearch: false,
        maxValuesShown: 4,
        searchText: 'Sorry nothing to see here',
        searchHighlight: true,
        selected: true,
        placeholderText: 'Country',
      },
      data: arr,
    });
    return searchArea;
  })
  .catch(err => {
    console.log(err);
  });

// INGREDIENTS
getAllSomething('ingredients').then(data => {
  let arr = data.map(({ name, _id }) => ({
    html: `<p>${name}</p>`,
    text: `${_id}`,
    value: `${_id}`,
  }));
  arr.unshift({ text: '', placeholder: true });
  searchIngredients = new SlimSelect({
    select: '.js-ingredients-select',

    settings: {
      showSearch: false,
      maxValuesShown: 4,
      searchText: 'Sorry nothing to see here',
      searchHighlight: true,
      selected: true,
      placeholderText: 'Ingridient',
    },
    data: arr,
  });
  return searchIngredients;
});
