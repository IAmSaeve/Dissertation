/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Upload from '../Pages/Upload';
import Download from "../Pages/Download";


class RouterOutput extends Component {

    render() {
      return (
            <main>
             <div>
              <Switch>
                    <Route exact path='/Download' component={Download}/>
                    <Route  path='/'  component={Upload}/> 
              </Switch>
                </div>
            </main>
      );
    }
  }
  
  export default RouterOutput;