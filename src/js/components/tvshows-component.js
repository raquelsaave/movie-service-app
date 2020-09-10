import React from "react";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";
import styles from "../../../dist/css/main.css"


class TVShows extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      tvlists: ""
    };
  }

  componentDidMount() {
      this.handleRender()
  }

  handleRender() {
    var tvlists = [];
    for (let a = 1; a < 10; a++) {
      // tvshowslist.push(array[a]);
      this.movieService.getTvShows(a).then(response => {
          // console.log(response.results)
          let array = response.results;
          var tvshowslist = [];
          for (let i = 0; i < array.length; i++) {
            tvshowslist.push(array[i]);
          }
          // console.log("list")
          // console.log(tvshowslist)
          tvlists.push(tvshowslist);
      });

    }
    // console.log("tvlists")
    // console.log(tvlists)
    this.setState({
      tvlists: tvlists
    })
  }

  handleLists(listName, name) {
    console.log("listName")
    console.log(listName)
    console.log(name)
    let lists = listName.map(item => {
      let title = item.title || item.name;
      let img = `http://image.tmdb.org/t/p/w300${item.backdrop_path}` || `https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png`
      return <li className={styles.itemContainer} key={item.id}>
                <img src={img} alt="Movie/Series Poster"/>
                <h4 className={styles.itemTitle}>{title}</h4>
            </li>;
    });

    let allInfo = {
      lists : lists,
      name: name
    }

    return allInfo
  }

  handleAllTvLists(tvlist) {
    console.log("handleAllTvLists")
    console.log(tvlist)
    let lists = tvlist.map(item => {
      // let title = item.title || item.name;
      console.log("item")
      console.log(item)
      var tvshowslist = this.handleLists(item, "TV")
      return <div className={styles.tvshows}>
              <h2>{tvshowslist.name}</h2>
              <ul className={styles.listContainer}>{tvshowslist.lists}</ul>
            </div>
    });

    return lists
  }

  render() {
    if(this.state.tvlists != ""){
      // var tvshowslist = this.handleLists(this.state.tvshowslist, "TV")
      console.log("state")
      console.log(this.state.tvlists)
      var allLists = this.handleAllTvLists(this.state.tvlists)
    }

    console.log(this.state.tvlists)

    return (
      <>
        <Header />

        <div className={styles.mainBody}>
          {allLists}
        </div>
      </>
    );
  }
}

export default TVShows;
