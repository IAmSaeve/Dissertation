/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Header from "./Router/Header";

ReactDOM.render(
    <BrowserRouter>
        <Header />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
