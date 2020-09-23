import React from "react";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";


import styles from "../../../dist/css/main.css"


class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
    };
  }

  componentDidMount() {
      this.handleRender();
  }


  handleRender() {
    var movielists = [];
    for (var a = 1; a < 10; a++) {
      this.movieService.getMovies(a).then(response => {
          let array = response.results;
          var movieslist = [];
          for (var i = 0; i < array.length; i++) {
            let title = array[i].title || array[i].name;
            var image = ""
            if(array[i].backdrop_path == undefined || array[i].backdrop_path == null)
            {
              image = `https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png`
              image =  <img className = {styles.placeholder} src={image} alt="Movie/Series Poster"/>
            } else
            {
              image = `http://image.tmdb.org/t/p/w300${array[i].backdrop_path}`
              image =  <img src={image} alt="Movie/Series Poster"/>
            }
            let lists =  <li className={styles.itemContainer} key={array[i].id}>
                            {image}
                            <h4 className={styles.itemTitle}>{title}</h4>
                        </li>;
            movieslist.push(lists);
          }

          let wholelist = <div className={styles.movies} key={Math.random()}>
                            <h2>Movie</h2>
                           <ul className={styles.listContainer}>{movieslist}</ul>
                        </div>
          movielists.push(wholelist);
        
          if(a == 10 && i == 20) {
            this.setState({
              movielists: movielists
            })
          }

        });

    }
  }

  render() {

    return (
      <>
        <Header />
        <div className={styles.mainBody}>
           {this.state.movielists}
        </div>
      </>
    );
  }
}

export default Movies;
