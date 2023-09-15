import SlimSelect from 'slim-select';

const search = new SlimSelect({
  select: '.js-time-select',
  settings: {
    showSearch: false,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: '10 min',
  },
});

const searchArea = new SlimSelect({
  select: '.js-area-select',

  settings: {
    showSearch: false,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Italian',
  },
});

const searchIngredients = new SlimSelect({
  select: '.js-ingredients-select',

  settings: {
    showSearch: false,
    maxValuesShown: 4,
    searchText: 'Sorry nothing to see here',
    searchHighlight: true,
    selected: true,
    placeholderText: 'Tomato',
  },
});
