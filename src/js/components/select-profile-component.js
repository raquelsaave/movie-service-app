import React from "react";
import { Link } from "react-router-dom";
import Header from "./header-component.js";


import styles from '../../../dist/css/main.css';

const SelectProfile = () => (
  <>
  <Header />
  <div className={styles.selectWrapper}>
    <h1>Who's watching? </h1>
    <ul className={styles.selectUser}>
      <Link to="/home"> 
        <li className={styles.users}>
            <img src="https://api.adorable.io/avatars/200/user1.png"/>
            <span className={styles.name}>User 1</span>
        </li>
      </Link>
      <Link to="/home"> 
        <li className={styles.users}>
            <img src="https://api.adorable.io/avatars/200/user2.png"/>
            <span className={styles.name}> User 2</span>
        </li>
      </Link>
      <Link to="/home"> 
        <li className={styles.users}>
            <img src="https://api.adorable.io/avatars/200/user3.png"/>
            <span className={styles.name}> User 3</span>
        </li>
      </Link>
      <Link to="/home"> 
        <li className={styles.users}>
            <img src="https://api.adorable.io/avatars/200/user4.png"/>
            <span className={styles.name}> User 4</span>
        </li>
      </Link>
      <Link to="/home"> 
        <li className={styles.users}>
            <img src="https://api.adorable.io/avatars/200/user5.png"/>
            <span className={styles.name}> User 5</span>
        </li>
      </Link>
    </ul>
  </div>
  {/* <Link to="/home">Onto Home</Link>
  <h1>GO</h1>
  <Link to="/">Back</Link> */}
  </>
);

export default SelectProfile;