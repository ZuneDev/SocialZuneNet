import React from 'react';

import Home from './pages/Home'
import Header from './components/Header'
import Footer from "./components/Footer";
import JoinTheSocial_default from "./pages/en-US/promotions/JoinTheSocial_default";
import Software_default from "./pages/en-US/products/software/default";
import Software_download_default from "./pages/en-US/products/software/download/default";
import PageNotFound from "./pages/PageNotFound";
import RedirectPage from './pages/Redirect';

const ReactRouterDOM = require('react-router-dom');
const {Routes, Switch, Route, Redirect} = ReactRouterDOM;
const Router = ReactRouterDOM.BrowserRouter;

function App() {
    return (
        <div>
            <Header/>
            <div className="App ZPage Zwrapper">
                <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/redirect" element={<RedirectPage/>}/>
                        <Route path={`/en-US/promotions/jointhesocial/:type`} element={<JoinTheSocial_default/>}/>
                        {/*<Redirect exact from='/blog/' to="/tutorials/" />*/}
                        {/*<Route path="/tutorials/" element={<About/>} />*/}
                        <Route path="/en-US/products/software/download/:page" element={<Software_download_default/>}/>
                        <Route path="/en-US/products/software/:page" element={<Software_default/>}/>

                        <Route path="/" element={<PageNotFound/>}/>
                </Routes>

                <Footer/>
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>

            </div>
        </div>
    );
}

export default App;
