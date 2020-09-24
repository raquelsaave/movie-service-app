import React from "react";

import Slider from "react-slick";

import Header from "./header-component.js";
import MovieService from "../services/movie-service.js";


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

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
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
                           <ul className={styles.listContainer}>
                            <Slider {...this.state.settings}>
                              {movieslist}
                            </Slider>
                            </ul>
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
