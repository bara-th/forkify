import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //1. Render spinner
    recipeView.renderSpinner();

    //2. Loading recipe
    await model.loadRecipe(id);

    //3.Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1, Get query
    const query = searchView.getQuery();

    if (!query) return;
    //2,load search results
    await model.loadSearchResults(query);

    //3,render results
    resultView.render(model.getSearchResults());

    paginationView.render(model.state.search);
  } catch (err) {
    // console.error(err);
    resultView.renderError();
  }
};

const controlPagination = function (gotoPage) {
  //1,render NEW results
  resultView.render(model.getSearchResults(gotoPage));

  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
