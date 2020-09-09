import React from "react";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      popularitylist: [],
      trendinglist:[],
      genreId: 0
    };
  }

  componentDidMount() {
      this.handleRender()
  }

  // handleRender(id) {
  handleRender() {
    // console.log(this.state.genreId)
    this.movieService.getMoviesbyPopularity().then(response => {
        console.log(response.results)
        let array = response.results;
        let popularitylist = [];
        for (let i = 0; i < array.length; i++) {
          popularitylist.push(array[i]);
        }
        this.setState({ popularitylist });
        // console.log(this.state.data);
      });

      this.movieService.getTrending("all","day").then(response => {
        console.log(response.results)
        let array = response.results;
        let trendinglist = [];
        for (let i = 0; i < array.length; i++) {
          trendinglist.push(array[i]);
        }
        this.setState({ trendinglist });
        // console.log(this.state.data);
      });

    
  }

  setGenre(e) {
    // console.log(e)
    this.setState({genreId:e})
  }

  render() {
    
    let popularitylist = this.state.popularitylist.map(movie => {
      return <li key={movie.id}>
                <h4>{movie.title}</h4>
                <span>{movie.overview}</span>
                <img src={`http://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt="Movie Poster"/>
            </li>;
    });

    let trendinglist = this.state.trendinglist.map(movie => {
      return <li key={movie.id}>
                <h4>{movie.title}</h4>
                <span>{movie.overview}</span>
                <img src={`http://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt="Movie Poster"/>
            </li>;
    });

    return (
      <>
        <Header />
        {/* <div>
          <input
            id="GenreId"
            value={this.state.genreId}
            placeholder="Genre Id"
            onChange={e => this.setGenre(e.target.value)}
          />
          <button onClick={this.handleRender(this.state.genreId)}>Search</button>
          <h2>Movie List by Genre : </h2>
          <ul>{itemList}</ul>
        </div> */}
        <div>
          {/* <button onClick={this.handleRender(this.state.genreId)}>Search</button> */}
          <h2>Trending : </h2>
          <ul>{trendinglist}</ul>
          <h2>Popular Movies : </h2>
          <ul>{popularitylist}</ul>
        </div>
      </>
    );
  }
}

export default Home;

