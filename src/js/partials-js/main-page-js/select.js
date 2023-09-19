import SlimSelect from 'slim-select';
import { getAllSomething } from "../service-api"


// TIME
const arr = []
for (let i = 5; i <= 120; i+= 5) {
  arr.push({
        html: `<p>${i} min</p>`,
        text: `${i}`,
        value: `${i}`
      })
}
arr.unshift({ text: '', placeholder: true })

const search = new SlimSelect({
  select: '.js-time-select',
  settings: {
    showSearch: true,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Time',
  },
  data: arr
});

// AREAS
getAllSomething("areas")
  .then(data => {
    let arr = data.map(({ name }) => (
      {
        html: `<p>${name}</p>`,
        text: `${name}`,
        value: `${name}`
      }
    ))
    arr.unshift({ text: '', placeholder: true })
    return new SlimSelect({
  select: '.js-area-select',

  settings: {
    showSearch: true,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Country',
  },
    data: arr
})
  }).catch(err => {console.log(err)})

  // INGRIDIENTS
  getAllSomething("ingredients")
    .then(data => {
      let arr = data.map(({name,_id}) => ({
        html: `<p>${name}</p>`,
        text: `${_id}`,
        value: `${_id}`
      }))
      arr.unshift({ text: '', placeholder: true });
      return new SlimSelect({
  select: '.js-ingredients-select',

  settings: {
    showSearch: true,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Ingridient',
        },
  data: arr
});
    })
