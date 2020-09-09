// const React = require('react')
// const ReactDOM = require('react-dom')
// const renderer = require('react-test-renderer')
// const {getFlyingSuperHeros} = require('../super-heros')
// import MovieService from "../services/movie-service.js";
// const {MovieService} = require("../services/movie-service.js")
// import Header from "../components/home-component.jsx";
/*
Find a full list of assertions here: https://facebook.github.io/jest/docs/en/expect.html
*/

// describe('Header renders correctly', () => {
//     it('renders correctly', () => {
//         const tree = renderer.create(<Header />).toJSON();

//         expect(tree).toMatchSnapshot();
//     });
// });

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  });