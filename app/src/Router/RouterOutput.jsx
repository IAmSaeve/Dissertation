import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import UploadContainer from "../Pages/UploadContainer";
import Download from "../Pages/Download";

const Router = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/Upload' component={UploadContainer} />
        <Route exact path='/Download/:id' component={Download} />
        <Redirect to="/Upload" />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;