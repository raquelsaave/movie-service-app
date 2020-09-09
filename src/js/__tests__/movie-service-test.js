const React = require('react')
const ReactDOM = require('react-dom')
const renderer = require('react-test-renderer')
// const {getFlyingSuperHeros} = require('../super-heros')
import MovieService from "../services/movie-service.js";
// const {MovieService} = require("../services/movie-service.js")
/*
import Header from "../components/home-component.jsx";

Find a full list of assertions here: https://facebook.github.io/jest/docs/en/expect.html
*/

test('Handle render of info', () => {
  MovieService = new MovieService();
  MovieService.getMoviesbyPopularity().then(response => {
    console.log(response.results)
    let array = response.results;
    let popularitylist = [];
    for (let i = 0; i < array.length; i++) {
      popularitylist.push(array[i]);
    }
    // console.log(this.state.data);
  });
})
