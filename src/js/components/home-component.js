import React from "react";

import Slider from "react-slick";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";
import SeeDetails from "./see-details-component.js"
import styles from "../../../dist/css/main.css"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex:"1"}}
      onClick={onClick}
    />
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      show: false,
      popularitylist: [],
      trendinglist:[],
      genreslists:[],
      genresavailable:[],
      mostTrending:"",
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5.8,
        slidesToScroll: 5.8,
        initialSlide: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3.5,
              slidesToScroll: 3.5,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2.5,
              slidesToScroll: 2.5,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1.7,
              slidesToScroll: 1.7,
            }
          }
        ]
      }
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

  showModal() {
    console.log("HEREEEE")
    console.log(this.state.show)
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({ show: false });
  }


  handleMostTrending(mostTrending) {
    var mostTrendingImg = mostTrending.backdrop_path;
    console.log("mostTrending")
    console.log(mostTrending)
    // adult: false
    // backdrop_path: "/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg"
    // genre_ids: (4) [12, 80, 18, 9648]
    // id: 497582
    // media_type: "movie"
    // original_language: "en"
    // original_title: "Enola Holmes"
    // overview: "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord."
    // popularity: 139.283
    // poster_path: "/riYInlsq2kf1AWoGm80JQW5dLKp.jpg"
    // release_date: "2020-09-23"
    // title: "Enola Holmes"
    // video: false
    // vote_average: 7.5
    // vote_count: 124
    var detailInfo = {
      title: mostTrending.title,
      overview: mostTrending.overview,
      poster: mostTrending.poster_path,
      media: mostTrending.media_type
    }
    return <div className={styles.trendingContainer}>
              <img className={styles.trending} src={`http://image.tmdb.org/t/p/original${mostTrendingImg}`} alt="Movie Poster"/>
              <div className={styles.trendingTitle}>
                <h3>{mostTrending.title}</h3>
                <SeeDetails
                  show={this.state.show}
                  handleClose={this.hideModal.bind(this)}
                  details={detailInfo}
                />
                <button className={styles.moreInfo} type="button" onClick={this.showModal.bind(this)}>
                  ⓘ More Info
                </button>
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
                <ul className={styles.listContainer}>
                <Slider {...this.state.settings}>
                  {list.lists}
                </Slider>
                </ul>
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
          <div>
            {mostTrending}
          </div>
          <div>
            <h2>{trendinglist.name}</h2>
            <ul className={styles.listContainer}>
            <Slider {...this.state.settings}>
              {trendinglist.lists}
            </Slider>
            </ul>
          </div>
          <div>
            <h2>{popularitylist.name}</h2>
            <ul className={styles.listContainer}>
            <Slider {...this.state.settings}>
              {popularitylist.lists}
            </Slider>
            </ul>
          </div>
          {genreslists}
        </div>
      </>
    );
  }
}

export default Home;

