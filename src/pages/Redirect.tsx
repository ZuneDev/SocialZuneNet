import React from 'react';
import '../assets/zune.css';
import {Helmet} from "react-helmet";
import {musicbrainzBase} from "../api/constants";

const ReactRouterDOM = require('react-router-dom');
const { Redirect, useSearchParams } = ReactRouterDOM;

function RedirectPage() {

    // http://social.zunes.me/redirect?type=album&id=314d3ce1-4dae-4c1a-8495-761b7f93cfd9&target=web&action=View
    let url: string = "";
    const [searchParams, setSearchParams] = useSearchParams();
    let type = searchParams.get("type")
    console.log(type);
    switch (type) {
        case "album":
            url = musicbrainzBase + "/release/" + searchParams.get("id");
            console.log(url)
            break;
    }

    return <Redirect to={url}/>;

}

export default RedirectPage;