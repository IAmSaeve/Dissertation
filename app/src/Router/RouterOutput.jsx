import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UploadContainer from "../Pages/UploadContainer";
import Download from "../Pages/Download";
import About from "../Pages/About";
import Project from "../Pages/Project";

const Router = () => (
  <Switch>
    <Route exact path='/Upload' component={UploadContainer} />
    <Route exact path='/About' component={About} />
    <Route exact path='/Project' component={Project} />
    <Route exact path='/Download/:id' component={Download} />
    <Redirect to="/Upload" />
  </Switch>
);

export default Router;