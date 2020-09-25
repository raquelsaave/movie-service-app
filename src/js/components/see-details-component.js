import React from "react";
import styles from "../../../dist/css/main.css"

function SeeDetails(props) {

    const showHideClassName = props.show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;
    
    var img = `http://image.tmdb.org/t/p/w300${props.details.poster}` || `https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png`
    return (
      <div className={showHideClassName}>
        <section className={styles.modalMain}>
            <div className={styles.detailsFull}>
                <img src={img} alt="Movie/Series Poster"/>
                <div>
                    <h4>{props.details.title}</h4>
                    <h5>Overview</h5>
                    <span className={styles.overview}>{props.details.overview}</span>
                    <button className={styles.closeDetails} onClick={props.handleClose}>Close</button>
                {/* <span className={styles.media}>{props.details.media}</span> */}
                </div>
            </div>
        </section>
      </div>
    );
}

export default SeeDetails;