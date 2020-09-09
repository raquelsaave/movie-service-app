import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./sign-in-component.js";
import SelectProfile from "./select-profile-component.js";


import Home from "./home-component.js";
import TVShows from "./tvshows-component.js";
import Movies from "./movies-component.js";
import Latest from "./latest-component.js";

const Main = () => (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/selectprofile" component={SelectProfile} />

      <Route exact path="/home" component={Home} />
      <Route exact path="/tvshows" component={TVShows} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/latest" component={Latest} />
      
    </Switch>
);
export default Main;