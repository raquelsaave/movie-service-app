import React, {Component} from 'react';
import { Link } from "react-router-dom";
import styles from "../../../dist/css/main.css"

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        path: ""
      };
    }
  
    componentDidMount() {
        let location = window.location.pathname
        this.setState({
            path: location
        })
        // this.handleRender()
    }
  
    // handleRender() {
    //     // console.log("hola")
    //     // console.log(window.location.pathname)
    //     // let location = window.location.pathname
    //     // this.setState({
    //     //     path: location
    //     // })
    // }
    
    handleShift(path) {
        var headerStructure = "";
        if(this.state.path != "/" && this.state.path != "/selectprofile"){
            headerStructure = <ul className={styles.header}>
            <li>
                <Link to="/home">MOVIE-SERVICE-APP</Link>
            </li>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/tvshows">Tv Shows</Link>
            </li>
            <li>
                <Link to="/movies">Movies</Link>
            </li>
            <li>
                <Link to="/latest">Latest</Link>
            </li>
            <li>
                <Link to="/">Sign Out</Link>
            </li>
            </ul>
        } else {
            headerStructure = <ul className={styles.header}>
            <li>
                <Link to="/home">MOVIE-SERVICE-APP</Link>
            </li>

            </ul>
            
        }
        return headerStructure
    
    }
    
    render() {  
    if(this.state.path != ""){
        var structure = this.handleShift(this.state.path)
    }
     return (
        <>
        <header>
            {structure}
        </header>
        </>
      );
    }
  }
  
  export default Header;
