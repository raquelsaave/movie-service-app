import React from "react";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";
import styles from "../../../dist/css/main.css"


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      popularitylist: [],
      trendinglist:[],
      genreslists:[],
      genresavailable:[],
      mostTrending:""
    };
  }

  componentDidMount() {
      this.handleRender()
  }

  handleRender() {
    this.movieService.getMoviesbyPopularity().then(response => {
        // console.log(response.results)
        let array = response.results;
        let popularitylist = [];
        for (let i = 0; i < array.length; i++) {
          popularitylist.push(array[i]);
        }
        this.setState({ popularitylist });
    });

    this.movieService.getTrending("all","day").then(response => {
        // console.log(response.results)
        let array = response.results;
        let trendinglist = [];
        for (let i = 0; i < array.length; i++) {
          trendinglist.push(array[i]);
        }
        this.setState({ 
          trendinglist : trendinglist,
          mostTrending : trendinglist[0]
        });
    });

    this.movieService.getGenres().then(response => {
      // console.log(response.genres)
      let array = response.genres;
      let genresavailable = [];
      for (let i = 0; i < array.length; i++) {
        genresavailable.push(array[i]);
      }

      var genreslists = [];
      for (let v= 0; v < genresavailable.length; v++) {
        this.movieService.getMoviesbyGenre(genresavailable[v].id).then(response => {
          let arrayGenres = response.results;
          var byGenrelists = [];
          for (let i = 0; i < arrayGenres.length; i++) {
            byGenrelists.push(arrayGenres[i]);
          }

          genreslists.push({
            genre: genresavailable[v].name,
            list: byGenrelists,
            id: genresavailable[v].id
          })
        });
      }
      this.setState({
        genresavailable : genresavailable,
        genreslists : genreslists
      });

    }); 

  }

  handleMostTrending(mostTrending) {
    var mostTrendingImg = mostTrending.backdrop_path
    return <div className={styles.trendingContainer}>
              <img className={styles.trending} src={`http://image.tmdb.org/t/p/original${mostTrendingImg}`} alt="Movie Poster"/>
              <div className={styles.trendingTitle}>
                <h3>{mostTrending.title}</h3>
                <span>More Info</span>
              </div>
          </div>
  }

  handleLists(listName, name) {
    console.log("listName")
    console.log(listName)
    console.log(name)
    let lists = listName.map(item => {
      let title = item.title || item.name;
      // let imgurl= item.backdrop_path
      let img = `http://image.tmdb.org/t/p/w300${item.backdrop_path}` || `https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png`
      return <li className={styles.itemContainer} key={item.id}>
                <img src={img} alt="Movie/Series Poster"/>
                <h4 className={styles.itemTitle}>{title}</h4>
                {/* <span>{movie.overview}</span> */}
            </li>;
    });

    let allInfo = {
      lists : lists,
      name: name
    }

    return allInfo
  }


  handleGenresBundle(genresLists) {
    let lists = genresLists.map(item => {
      console.log(item)
      // let title = item.title || item.name || item.genre;
      let list = this.handleLists(item.list, item.genre)
      return <div key={item.id}>
                <h2>{item.genre}</h2>
                <ul className={styles.listContainer}>{list.lists}</ul>
            </div>;
    });
    return lists
  }

  render() {
    if(this.state.genreslists != undefined){
      var mostTrending = this.handleMostTrending(this.state.mostTrending)
      var trendinglist = this.handleLists(this.state.trendinglist , "Trending Now")
      var popularitylist = this.handleLists(this.state.popularitylist, "Popular Movies")
      var genreslists = this.handleGenresBundle(this.state.genreslists)
    }

    return (
      <>
        <Header />

        <div className={styles.mainBody}>
          <div>{mostTrending}</div>
          <div>
            <h2>{trendinglist.name}</h2>
            <ul className={styles.listContainer}>{trendinglist.lists}</ul>
          </div>
          <div>
            <h2>{popularitylist.name}</h2>
            <ul className={styles.listContainer}>{popularitylist.lists}</ul>
          </div>
          {genreslists}
        </div>
      </>
    );
  }
}

export default Home;

