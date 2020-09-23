import React from "react";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";


import styles from "../../../dist/css/main.css"


class TVShows extends React.Component {
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
    var tvlists = [];
    for (var a = 1; a < 10; a++) {
      this.movieService.getTvShows(a).then(response => {
          let array = response.results;
          var tvshowslist = [];
          for (var i = 0; i < array.length; i++) {
            let title = array[i].title || array[i].name;
            var image = ""
            if(array[i].backdrop_path == undefined || array[i].backdrop_path == null)
            {
              console.log("null")
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
            tvshowslist.push(lists);
          }

          let wholelist = <div className={styles.tvshows} key={Math.random()}>
                            <h2>TV</h2>
                           <ul className={styles.listContainer}>{tvshowslist}</ul>
                        </div>
          tvlists.push(wholelist);
        
          if(a == 10 && i == 20) {
            this.setState({
              tvlists: tvlists
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
           {this.state.tvlists}
        </div>
      </>
    );
  }
}

export default TVShows;
