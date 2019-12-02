import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Upload from "../Pages/Upload";
import Download from "../Pages/Download";

const Router = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/Download" to="/Upload" />
        <Route exact path='/' component={Upload} />
        <Route exact path='/Download/:id' component={Download} />
        <Redirect to="/Upload" />
      </Switch>
    </BrowserRouter>
  </main>
);

export default Router;