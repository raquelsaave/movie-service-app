import React from "react";
import { Link } from "react-router-dom";
// import styles from "./header-component.scss"

const Header = () => (
        <div>
            <ul>
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
        </div>
);

export default Header;
