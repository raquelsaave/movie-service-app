import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Header from "./header-component.js";

import styles from "../../../dist/css/main.css"
// import "../../../dist/css/main.css"

class SignInComponent extends Component {
	constructor() {
		super();
		// State holds form data
		this.state = {
			form: { email: "", password: "" }
		}
	}

	handleChange(event) {
		// A field value needs to be updated in state
		this.setState({
			form: { ...this.state.form, [event.target.name]: event.target.value } // fieldName = fieldValue
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		event.stopPropagation();

	}

	render() {
		return (
      <>
         <Header />
        <div className={styles.signIn}>
          <div className={styles.wrapper}>
            <div className={styles.headerSignIn}>
              <h1>Sign In</h1>
            </div>
            <div>
                <form className={styles.bodySignIn} onSubmit={this.handleSubmit.bind(this)}>
                  <span className={styles.input}>
                    <input type="text" name="email"
                            placeholder="Email or phone number"
                            className={styles.inputGroup}		
                            value={this.state.form.email}
                            onChange={this.handleChange.bind(this)}/>
                  </span>
                  <span>
                    <input type="text" name="password"
                            placeholder="Password"
                            className={styles.inputGroup}		
                            value={this.state.form.password}
                            onChange={this.handleChange.bind(this)}/>

                  </span>
                  <span>
                    <Link to="/selectprofile"> <input className={`${styles.inputGroup} ${styles.signInButton}`} type="submit" value="Sign In"/> </Link>
                  </span>
                  
                </form>
            </div>
          </div>
        </div>
      </>
		);
	}
}

export default SignInComponent;

