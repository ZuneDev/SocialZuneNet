import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from "./App";

import Home from './pages/Home'
import Header from './components/Header'
import Footer from "./components/Footer";
import JoinTheSocial_default from "./pages/en-US/promotions/JoinTheSocial_default";
import Software_default from "./pages/en-US/products/software/default";
import Software_download_default from "./pages/en-US/products/software/download/default";
import PageNotFound from "./pages/PageNotFound";
import RedirectPage from './pages/Redirect';
import {BrowserRouter} from "react-router-dom";

const ReactRouterDOM = require('react-router-dom');
const {Switch, Route, Redirect} = ReactRouterDOM;
const Router = ReactRouterDOM.BrowserRouter;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
