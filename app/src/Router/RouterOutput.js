import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Upload from "../Pages/Upload";
import Download from "../Pages/Download";

const Router = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/Upload' component={Upload} />
        <Route exact path='/Download/:id' component={Download} />
        <Redirect to="/Upload" />
      </Switch>
    </BrowserRouter>
  </main>
);

export default Router;