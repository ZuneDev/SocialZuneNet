import React from 'react';
import {Helmet} from 'react-helmet';
import {catalogBase} from "../api/constants";

// import onyourphone_rocky_us from '../assets/onyourphone_rocky_us.png';

import '../App.css';
import '../assets/zune.css';
import '../assets/zune_argo.css';
import HomeMusicCard from "../components/HomeMusicCard";

const axios = require("axios");

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            musicEntry: null
        };
    }

    ajaxLoader(albumNewReleases: string, s: string) {
        return function (p1: React.MouseEvent<HTMLAnchorElement>) {
            console.log(albumNewReleases);
            console.log(s);
        };
    }

    // Changes XML to JSON
    xmlToJson(xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    };

    componentDidMount() {
        let url = catalogBase + "/music/chart/zune/tracks";
        console.log(url);
        axios.get(url)
            .then((response: any) => {
                let feed: ChildNode = response.request.responseXML.childNodes[0];
                if (feed.ownerDocument == null)
                    return;

                let evaluator = new XPathEvaluator();
                let expression = evaluator.createExpression("//*[local-name()='entry']");
                let result = expression.evaluate(feed.ownerDocument, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
                let item = result.iterateNext();
                this.setState({
                    musicEntry: this.xmlToJson(item)
                })
                /*while (item) {
                    let json = this.xmlToJson(item);
                    console.log(json);
                    this.setState({
                        items: this.state["items"].concat(json)
                    })
                    item = result.iterateNext();
                }
                console.log(this.state["items"]);*/
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Music | Zunes.tk</title>
                </Helmet>

                <div id="_musicLandingHead" style={{display: "block", clear: "both"}}>
                    <div id="_breadCrumbTitle" className="block b_adCrumbTitle">
                        <ul className="BreadCrumb">
                            <li className="last">&nbsp;</li>
                        </ul>

                        <h1>
                            <p>music</p>
                        </h1>

                    </div>
                </div>

                <div id="_head" className="LeftNav">
                    <div id="_leftNav" className="block b_tNavBlock">
                        <ul className="LeftNavText">
                            <li><a href="music/genre/gb.rock">Rock</a></li>
                            <li><a href="music/genre/gb.urban">Urban</a></li>
                            <li><a href="music/genre/gb.pop">Pop</a></li>
                            <li><a href="music/genre/gb.dance">Dance</a></li>
                            <li><a href="music/genre/gb.world">World</a></li>
                            <li><a href="music/genre/gb.soundtracks">Soundtracks</a></li>
                            <li><a href="music/genre/gb.easyListening">
                                Easy Listening
                            </a></li>
                            <li><a href="music/genre/gb.more">More</a></li>
                        </ul>
                        <ul className="SubLeftNav LeftNavText">
                            <li><a href="music/playlists">Playlists</a></li>
                        </ul>
                    </div>
                </div>

                <div id="_r2" className="MainContent">
                    <div className="musicHero">
                        <div id="_silverlightBlock" className="block b_verlightBlock">
                            <div id="silverlightControlHost">
                                <object data="data:application/x-silverlight-2," type="application/x-silverlight-2"
                                        width="800" height="264" id="_silverlightBlockControl">
                                    <param name="source" value="/xweb/lx/xap/PanelHero.xap?ver=11122104"/>
                                    <param name="onerror" value="onSilverlightError"/>
                                    <param name="background" value="transparent"/>
                                    <param name="windowless" value="true"/>
                                    <param name="inplaceInstallPrompt" value="true"/>
                                    <param name="culture" value="en-GB"/>
                                    <param name="uiculture" value="en-GB"/>
                                    <param name="minRuntimeVersion" value="3.0.40624.0"/>
                                    <param name="initParams"
                                           value="displayObject=,includePurchaseBIInfo=True,json={&quot;label&quot;:&quot;music&quot;%2C&quot;feed&quot;:[{&quot;Id&quot;:&quot;1e61c533-a952-481c-b7c6-393b3f01081e&quot;%2C&quot;image&quot;:{&quot;isConstellation&quot;:&quot;true&quot;%2C&quot;url&quot;:&quot;http://image.catalog.zunes.tk/v3.2/image/856174ce-fccc-40d8-b1fa-977ac3143731?resize=true&amp;width=470&amp;height=264&quot;}%2C&quot;link&quot;:{&quot;target&quot;:&quot;58d80607-0100-11db-89ca-0019b92a3933&quot;%2C&quot;type&quot;:&quot;Album&quot;}%2C&quot;title&quot;:&quot;JLS&quot;%2C&quot;text&quot;:&quot;Brand New Single&quot;%2C&quot;url&quot;:&quot;/album/58d80607-0100-11db-89ca-0019b92a3933&quot;%2C&quot;playEnabled&quot;:false}%2C{&quot;Id&quot;:&quot;6e6939a2-ff70-44a0-b0a5-ce08bcbfc7d2&quot;%2C&quot;image&quot;:{&quot;isConstellation&quot;:&quot;true&quot;%2C&quot;url&quot;:&quot;http://image.catalog.zunes.tk/v3.2/image/3ff01531-eb3b-454a-94fc-21513cba5f0a?resize=true&amp;width=150&amp;height=84&quot;}%2C&quot;link&quot;:{&quot;target&quot;:&quot;97e60200-0200-11db-89ca-0019b92a3933&quot;%2C&quot;type&quot;:&quot;Artist&quot;}%2C&quot;title&quot;:&quot;Trending Up&quot;%2C&quot;text&quot;:&quot;Newly single Katy Perry&quot;%2C&quot;url&quot;:&quot;/artist/97e60200-0200-11db-89ca-0019b92a3933&quot;%2C&quot;playEnabled&quot;:false}%2C{&quot;Id&quot;:&quot;80bcaab9-84ef-48a5-9c90-f12140fce110&quot;%2C&quot;image&quot;:{&quot;isConstellation&quot;:&quot;true&quot;%2C&quot;url&quot;:&quot;http://image.catalog.zunes.tk/v3.2/image/0e14953f-432e-4d6e-ae1b-386b02204a6e?resize=true&amp;width=150&amp;height=84&quot;}%2C&quot;link&quot;:{&quot;target&quot;:&quot;aef5adb2-d08b-4163-85df-458e02fe6a87&quot;%2C&quot;type&quot;:&quot;Playlist&quot;}%2C&quot;title&quot;:&quot;Sounds of 2012&quot;%2C&quot;text&quot;:&quot;Our ones to watch&quot;%2C&quot;url&quot;:&quot;/music/playlist/aef5adb2-d08b-4163-85df-458e02fe6a87&quot;%2C&quot;playEnabled&quot;:false}%2C{&quot;Id&quot;:&quot;5de8593b-71f6-4a8a-a070-7cbc01487512&quot;%2C&quot;image&quot;:{&quot;isConstellation&quot;:&quot;true&quot;%2C&quot;url&quot;:&quot;http://image.catalog.zunes.tk/v3.2/image/05c93a19-95d4-4b75-9013-a4da797ea438?resize=true&amp;width=150&amp;height=84&quot;}%2C&quot;link&quot;:{&quot;target&quot;:&quot;eecd0807-0100-11db-89ca-0019b92a3933&quot;%2C&quot;type&quot;:&quot;Album&quot;}%2C&quot;title&quot;:&quot;Defected Presents&quot;%2C&quot;text&quot;:&quot;Bodymusic - Gym&quot;%2C&quot;url&quot;:&quot;/album/eecd0807-0100-11db-89ca-0019b92a3933&quot;%2C&quot;playEnabled&quot;:false}%2C{&quot;Id&quot;:&quot;0873fb5c-f248-4748-83d5-fc73aac52648&quot;%2C&quot;image&quot;:{&quot;isConstellation&quot;:&quot;true&quot;%2C&quot;url&quot;:&quot;http://image.catalog.zunes.tk/v3.2/image/5535ab87-ce42-46f0-9fdf-ebbb8da753c8?resize=true&amp;width=150&amp;height=84&quot;}%2C&quot;link&quot;:{&quot;target&quot;:&quot;7e170907-0100-11db-89ca-0019b92a3933&quot;%2C&quot;type&quot;:&quot;Album&quot;}%2C&quot;title&quot;:&quot;Taio Cruz&quot;%2C&quot;text&quot;:&quot;Troublemaker&quot;%2C&quot;url&quot;:&quot;/album/7e170907-0100-11db-89ca-0019b92a3933&quot;%2C&quot;playEnabled&quot;:false}]}"/>

                                </object>
                                <iframe style={{visibility: "hidden", height: 0, width: 0, border: 0}}/>
                            </div>
                        </div>
                    </div>
                    <div className="WideViewWrapper">
                        <div id="_musicPicks" className="block b_ksBlock ArtistPicks"/>
                        <div id="_albumNewReleases"
                             className="block b_umReleasesBlock BrowseWrapper TVBrowseWrapper NewReleaseTVBrowseWrapper">
                            <div className="Pager">
                                <div className="SmallPager">
                                    <a className="Next"
                                       onClick={this.ajaxLoader('_albumNewReleases','/frag/AlbumReleasesBlock/?Origin=&amp;PurchaseBIContextGuidKey=&amp;PurchaseBIPicksContextKey=&amp;GenreId=&amp;AlbumCollectionId=&amp;PurchaseBIContext=EditorialOrFeaturedLink&amp;PageSize=&amp;PageIndex=2&amp;StartMarker=&amp;EndMarker=&amp;PrevClicked=&amp;blockName=AlbumReleasesBlock&amp;id=_albumNewReleases&amp;')}/>
                                    <a className="PreviousDisabled" onClick={this.ajaxLoader('_albumNewReleases','')}/>
                                    <span>1-5/30</span>
                                </div>
                            </div>
                            <div>
                                {/*none!important*/}
                                <h2 style={{display: "block", float: "none"}}>
                                    <p>NEW RELEASES</p>
                                </h2>
                            </div>

                            <ul>
                                <li className="BrowseUnit ">
                                    <a className="jsAlbum BrowseImage"
                                       href="album/Coldplay/Paradise/1825f106-0100-11db-89ca-0019b92a3933/details"
                                       sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;1825f106-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;album&quot;,&quot;artistName&quot;:&quot;Coldplay&quot;,&quot;albumName&quot;:&quot;Paradise&quot;,&quot;albumArtUrl&quot;:&quot;http\x3a\x2f\x2fimage.catalog.zune.net\x2fv3.0\x2fimage\x2f1825f106-0300-11db-89ca-0019b92a3933\x3fresize\x3dtrue\x26width\x3d64\x26height\x3d64&quot;,&quot;messageTitle&quot;:&quot;send this album&quot;}"
                                       canpurchase="true"
                                       purchaseinfo="http://www.bing.com/shopping/search?q=Paradise Coldplay&amp;go=&amp;form=QBRE"
                                       mediainfo="1825f106-0100-11db-89ca-0019b92a3933#album#Paradise"
                                       isactionable="True"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;1825f106-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                       mixviewinfo="displayObject=album,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%221825f106-0100-11db-89ca-0019b92a3933%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104">
                                        <img className="jsNewImage"
                                             src="http://image.catalog.zunes.tk/v3.2/image/1825f106-0300-11db-89ca-0019b92a3933?resize=true&amp;width=150&amp;height=150"
                                             title="Paradise" alt="Paradise"/></a>
                                    <a href="album/Coldplay/Paradise/1825f106-0100-11db-89ca-0019b92a3933/details"
                                       title="Paradise"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;1825f106-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">Paradise</a>
                                    <div>
                                        <a className="Name"
                                           href="artist/Coldplay/0a190000-0200-11db-89ca-0019b92a3933">Coldplay</a>
                                    </div>
                                </li>
                                <li className="BrowseUnit ">
                                    <a className="jsAlbum BrowseImage"
                                       href="album/Taio-Cruz/Troublemaker-(Remixes)/7e170907-0100-11db-89ca-0019b92a3933/details"
                                       sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;7e170907-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;album&quot;,&quot;artistName&quot;:&quot;Taio Cruz&quot;,&quot;albumName&quot;:&quot;Troublemaker \x28Remixes\x29&quot;,&quot;albumArtUrl&quot;:&quot;http\x3a\x2f\x2fimage.catalog.zune.net\x2fv3.0\x2fimage\x2f7e170907-0300-11db-89ca-0019b92a3933\x3fresize\x3dtrue\x26width\x3d64\x26height\x3d64&quot;,&quot;messageTitle&quot;:&quot;send this album&quot;}"
                                       canpurchase="true"
                                       purchaseinfo="http://www.bing.com/shopping/search?q=Troublemaker (Remixes) Taio Cruz&amp;go=&amp;form=QBRE"
                                       mediainfo="7e170907-0100-11db-89ca-0019b92a3933#album#Troublemaker (Remixes)"
                                       isactionable="True"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;7e170907-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                       mixviewinfo="displayObject=album,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%227e170907-0100-11db-89ca-0019b92a3933%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104">
                                        <img className="jsNewImage"
                                             src="http://image.catalog.zunes.tk/v3.2/image/7e170907-0300-11db-89ca-0019b92a3933?resize=true&amp;width=150&amp;height=150"
                                             title="Troublemaker (Remixes)" alt="Troublemaker (Remixes)"/>
                                    </a>
                                    <a href="album/Taio-Cruz/Troublemaker-(Remixes)/7e170907-0100-11db-89ca-0019b92a3933/details"
                                       title="Troublemaker (Remixes)"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;7e170907-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">Troublemaker
                                        (Remixes)</a>
                                    <div>
                                        <a className="Name"
                                           href="artist/Taio-Cruz/64d90400-0200-11db-89ca-0019b92a3933">Taio Cruz</a>
                                    </div>
                                </li>
                                <li className="BrowseUnit ">
                                    <a className="jsAlbum BrowseImage"
                                       href="album/Various-Artists/Get-Fit/82750107-0100-11db-89ca-0019b92a3933/details"
                                       sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;82750107-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;album&quot;,&quot;artistName&quot;:&quot;Various Artists&quot;,&quot;albumName&quot;:&quot;Get Fit&quot;,&quot;albumArtUrl&quot;:&quot;http\x3a\x2f\x2fimage.catalog.zune.net\x2fv3.0\x2fimage\x2f82750107-0300-11db-89ca-0019b92a3933\x3fresize\x3dtrue\x26width\x3d64\x26height\x3d64&quot;,&quot;messageTitle&quot;:&quot;send this album&quot;}"
                                       canpurchase="true"
                                       purchaseinfo="http://www.bing.com/shopping/search?q=Get Fit Various Artists&amp;go=&amp;form=QBRE"
                                       mediainfo="82750107-0100-11db-89ca-0019b92a3933#album#Get Fit"
                                       isactionable="True"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;82750107-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                       mixviewinfo="displayObject=album,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%2282750107-0100-11db-89ca-0019b92a3933%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104">
                                        <img className="jsNewImage"
                                             src="http://image.catalog.zunes.tk/v3.2/image/82750107-0300-11db-89ca-0019b92a3933?resize=true&amp;width=150&amp;height=150"
                                             title="Get Fit" alt="Get Fit"/>
                                    </a>
                                    <a href="album/Various-Artists/Get-Fit/82750107-0100-11db-89ca-0019b92a3933/details"
                                       title="Get Fit"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;82750107-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        Get Fit</a>
                                    <div>
                                        <a className="Name"
                                           href="artist/Various-Artists/09890000-0200-11db-89ca-0019b92a3933">Various
                                            Artists</a>
                                    </div>
                                </li>
                                <li className="BrowseUnit ">
                                    <a className="jsAlbum BrowseImage"
                                       href="album/Amy-Winehouse/Lioness:-Hidden-Treasures/3fc80507-0100-11db-89ca-0019b92a3933/details"
                                       sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;3fc80507-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;album&quot;,&quot;artistName&quot;:&quot;Amy Winehouse&quot;,&quot;albumName&quot;:&quot;Lioness\x3a Hidden Treasures&quot;,&quot;albumArtUrl&quot;:&quot;http\x3a\x2f\x2fimage.catalog.zune.net\x2fv3.0\x2fimage\x2f3fc80507-0300-11db-89ca-0019b92a3933\x3fresize\x3dtrue\x26width\x3d64\x26height\x3d64&quot;,&quot;messageTitle&quot;:&quot;send this album&quot;}"
                                       canpurchase="true"
                                       purchaseinfo="http://www.bing.com/shopping/search?q=Lioness: Hidden Treasures Amy Winehouse&amp;go=&amp;form=QBRE"
                                       mediainfo="3fc80507-0100-11db-89ca-0019b92a3933#album#Lioness: Hidden Treasures"
                                       isactionable="True"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;3fc80507-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                       mixviewinfo="displayObject=album,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%223fc80507-0100-11db-89ca-0019b92a3933%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104">
                                        <img className="jsNewImage"
                                             src="http://image.catalog.zunes.tk/v3.2/image/3fc80507-0300-11db-89ca-0019b92a3933?resize=true&amp;width=150&amp;height=150"
                                             title="Lioness: Hidden Treasures" alt="Lioness: Hidden Treasures"/>
                                    </a>
                                    <a href="album/Amy-Winehouse/Lioness:-Hidden-Treasures/3fc80507-0100-11db-89ca-0019b92a3933/details"
                                       title="Lioness: Hidden Treasures"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;3fc80507-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        Lioness: Hidden Treasures</a>
                                    <div>
                                        <a className="Name"
                                           href="artist/Amy-Winehouse/67010300-0200-11db-89ca-0019b92a3933">Amy
                                            Winehouse</a>
                                    </div>
                                </li>
                                <li className="BrowseUnit BrowseUnitLastCol">
                                    <a className="jsAlbum BrowseImage"
                                       href="album/Various-Artists/Latin-Dance-Workout/01530407-0100-11db-89ca-0019b92a3933/details"
                                       sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;01530407-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;album&quot;,&quot;artistName&quot;:&quot;Various Artists&quot;,&quot;albumName&quot;:&quot;Latin Dance Workout&quot;,&quot;albumArtUrl&quot;:&quot;http\x3a\x2f\x2fimage.catalog.zune.net\x2fv3.0\x2fimage\x2f01530407-0300-11db-89ca-0019b92a3933\x3fresize\x3dtrue\x26width\x3d64\x26height\x3d64&quot;,&quot;messageTitle&quot;:&quot;send this album&quot;}"
                                       canpurchase="true"
                                       purchaseinfo="http://www.bing.com/shopping/search?q=Latin Dance Workout Various Artists&amp;go=&amp;form=QBRE"
                                       mediainfo="01530407-0100-11db-89ca-0019b92a3933#album#Latin Dance Workout"
                                       isactionable="True"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;01530407-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                       mixviewinfo="displayObject=album,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%2201530407-0100-11db-89ca-0019b92a3933%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104">
                                        <img className="jsNewImage"
                                             src="http://image.catalog.zunes.tk/v3.2/image/01530407-0300-11db-89ca-0019b92a3933?resize=true&amp;width=150&amp;height=150"
                                             title="Latin Dance Workout" alt="Latin Dance Workout"/>
                                    </a>
                                    <a href="album/Various-Artists/Latin-Dance-Workout/01530407-0100-11db-89ca-0019b92a3933/details"
                                       title="Latin Dance Workout"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;01530407-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        Latin Dance Workout</a>
                                    <div>
                                        <a className="Name"
                                           href="artist/Various-Artists/09890000-0200-11db-89ca-0019b92a3933">Various
                                            Artists</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="MediumColumn">
                        <div id="_weRecommend" className="block b_iaListBlock MediumViewWrapper MediaListWraper">
                            <h2>
                                <p>We Recommend</p>
                            </h2>

                            <ul className="MediaList">
                                <li className="">
                                    <a className="Title"
                                       href="album/3fc80507-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;194f62cf-3e79-418e-92ee-c72a35917043&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <strong>Remembering Amy</strong>
                                    </a>
                                    <div>Lioness: Hidden Treasures</div>
                                    <a className="Img"
                                       href="album/3fc80507-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;194f62cf-3e79-418e-92ee-c72a35917043&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <img
                                            src="http://image.catalog.zunes.tk/v3.2/image/c5932467-0803-441a-89ec-6312aa0fe83c?resize=true&amp;width=75&amp;height=75"
                                            title="Remembering Amy" alt="Remembering Amy"/>
                                    </a>
                                </li>
                                <li className="">
                                    <a className="Title"
                                       href="album/1c2e2806-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;9f850e4b-e979-4e0b-972c-6dfa7057fd71&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <strong>Rewind: 2007</strong>
                                    </a>
                                    <div>The Klaxons' debut Myths Of The Near Future, charting at number 2 upon its
                                        release 5 years ago this month
                                    </div>
                                    <a className="Img"
                                       href="album/1c2e2806-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;9f850e4b-e979-4e0b-972c-6dfa7057fd71&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <img
                                            src="http://image.catalog.zunes.tk/v3.2/image/e55a76d7-c826-491e-96d4-3b11810689f7?resize=true&amp;width=75&amp;height=75"
                                            title="Rewind: 2007" alt="Rewind: 2007"/>
                                    </a>
                                </li>
                                <li className="">
                                    <a className="Title"
                                       href="album/38120307-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;83e919ca-e9fe-42c4-8d07-7d728b3f1232&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <strong>The Puppini Sisters</strong>
                                    </a>
                                    <div>New album Hollywood</div>
                                    <a className="Img"
                                       href="album/38120307-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;83e919ca-e9fe-42c4-8d07-7d728b3f1232&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <img
                                            src="http://image.catalog.zunes.tk/v3.2/image/7081e7bb-9f9e-49fe-bee3-b8f2ef5a3252?resize=true&amp;width=75&amp;height=75"
                                            title="The Puppini Sisters" alt="The Puppini Sisters"/>
                                    </a>
                                </li>
                                <li className="">
                                    <a className="Title"
                                       href="album/fed00807-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;b2fae2cf-b95a-4293-a590-064885e0d58c&quot;, &quot;picksContext&quot;:&quot;&quot;}"><strong>Common</strong></a>
                                    <div>New The Dreamer, The Believer</div>
                                    <a className="Img"
                                       href="album/fed00807-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;b2fae2cf-b95a-4293-a590-064885e0d58c&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <img
                                            src="http://image.catalog.zunes.tk/v3.2/image/f0c8f7eb-3bca-4b9d-b20c-2f739131cac6?resize=true&amp;width=75&amp;height=75"
                                            title="Common" alt="Common"/>
                                    </a>
                                </li>
                                <li className="MediaListLastRow">
                                    <a className="Title"
                                       href="album/9acd0807-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;3b996566-515e-477f-acc1-36abbb5001e5&quot;, &quot;picksContext&quot;:&quot;&quot;}"><strong>Delilah</strong></a>
                                    <div>One to Watch in 2012</div>
                                    <a className="Img"
                                       href="album/9acd0807-0100-11db-89ca-0019b92a3933"
                                       purchasebiinfo="{ &quot;contextEvent&quot;: &quot;30&quot;, &quot;contextGuid&quot;:&quot;3b996566-515e-477f-acc1-36abbb5001e5&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <img
                                            src="http://image.catalog.zunes.tk/v3.2/image/99502143-0252-4d8b-8e9c-2d65bf015f7c?resize=true&amp;width=75&amp;height=75"
                                            title="Delilah" alt="Delilah"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="_chartTopArtists" className="block b_rtTopArtists MediaListWraper MediumViewWrapper">
                            <h2>
                                <p>most played artists</p>
                            </h2>
                            <div className="Pivot">
                                <a href="#"
                                   onClick="ajaxLoader('_chartTopArtists','/frag/ChartTopArtists/?PurchaseBIContextGuidKey=&amp;PurchaseBIPicksContextKey=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;GenreId=&amp;Count=&amp;ArtistId=&amp;IsLandingPage=true&amp;IdType=&amp;TimePivot=ThisWeek&amp;blockName=ChartTopArtists&amp;id=_chartTopArtists&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                   className="Selected">This week</a>
                                <span
                                    style={{display: "none"}}>/frag/ChartTopArtists/?PurchaseBIContextGuidKey=&amp;PurchaseBIPicksContextKey=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;GenreId=&amp;Count=&amp;ArtistId=&amp;IsLandingPage=true&amp;IdType=&amp;TimePivot=ThisWeek&amp;blockName=ChartTopArtists&amp;id=_chartTopArtists&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                                <a href="#"
                                   onClick="ajaxLoader('_chartTopArtists','/frag/ChartTopArtists/?PurchaseBIContextGuidKey=&amp;PurchaseBIPicksContextKey=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;GenreId=&amp;Count=&amp;ArtistId=&amp;IsLandingPage=true&amp;IdType=&amp;TimePivot=AllTime&amp;blockName=ChartTopArtists&amp;id=_chartTopArtists&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                   className="">All time</a>
                                <span
                                    style={{display: "none"}}>/frag/ChartTopArtists/?PurchaseBIContextGuidKey=&amp;PurchaseBIPicksContextKey=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;GenreId=&amp;Count=&amp;ArtistId=&amp;IsLandingPage=true&amp;IdType=&amp;TimePivot=AllTime&amp;blockName=ChartTopArtists&amp;id=_chartTopArtists&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                            </div>
                            <table className="MediaList">
                                <tbody>
                                <tr className="jsTrack TopSongs" purchaseinfo=""
                                    mediainfo="ee260000-0200-11db-89ca-0019b92a3933#song#" sendinfo="">
                                    <td className="Image">
                                        <a href="artist/Eminem/ee260000-0200-11db-89ca-0019b92a3933"
                                           mediainfo="ee260000-0200-11db-89ca-0019b92a3933#artist#Eminem"
                                           learninfo="artist/Eminem/ee260000-0200-11db-89ca-0019b92a3933"
                                           mixviewinfo="displayObject=artist,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%22%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22ee260000-0200-11db-89ca-0019b92a3933%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104"
                                           hasfollowed="false"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;ee260000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Img jsCrop jsArtist">
                                            <img className="jsNewImage" alt=""
                                                 src="http://image.catalog.zunes.tk/v3.2/image/5311af8f-9a77-43ea-9a3a-f19165da46ee?resize=false&amp;height=60"/>
                                        </a>
                                    </td>
                                    <td className="Description"><a
                                        href="artist/Eminem/ee260000-0200-11db-89ca-0019b92a3933"
                                        className="Title"
                                        purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;ee260000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"><strong>Eminem</strong></a>
                                    </td>
                                    <td className="Total"><strong>6,666</strong> plays</td>
                                </tr>
                                <tr className="jsTrack TopSongs" purchaseinfo=""
                                    mediainfo="0a190000-0200-11db-89ca-0019b92a3933#song#" sendinfo="">
                                    <td className="Image">
                                        <a href="artist/Coldplay/0a190000-0200-11db-89ca-0019b92a3933"
                                           mediainfo="0a190000-0200-11db-89ca-0019b92a3933#artist#Coldplay"
                                           learninfo="artist/Coldplay/0a190000-0200-11db-89ca-0019b92a3933"
                                           mixviewinfo="displayObject=artist,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%22%22%7d%2c%22artist%22%3a%7b%22id%22%3a%220a190000-0200-11db-89ca-0019b92a3933%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104"
                                           hasfollowed="false"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;0a190000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Img jsCrop jsArtist">
                                            <img className="jsNewImage" alt=""
                                                 src="http://image.catalog.zunes.tk/v3.2/image/7b28a9c2-98df-48ee-a92e-a07ffb5f467e?resize=false&amp;height=60"/>
                                        </a>
                                    </td>
                                    <td className="Description">
                                        <a href="artist/Coldplay/0a190000-0200-11db-89ca-0019b92a3933"
                                           className="Title"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;0a190000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"><strong>Coldplay</strong></a>
                                    </td>
                                    <td className="Total"><strong>6,317</strong> plays</td>
                                </tr>
                                <tr className="jsTrack TopSongs" purchaseinfo=""
                                    mediainfo="e2f10200-0200-11db-89ca-0019b92a3933#song#" sendinfo="">
                                    <td className="Image">
                                        <a href="artist/Rihanna/e2f10200-0200-11db-89ca-0019b92a3933"
                                           mediainfo="e2f10200-0200-11db-89ca-0019b92a3933#artist#Rihanna"
                                           learninfo="artist/Rihanna/e2f10200-0200-11db-89ca-0019b92a3933"
                                           mixviewinfo="displayObject=artist,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%22%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22e2f10200-0200-11db-89ca-0019b92a3933%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104"
                                           hasfollowed="false"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;e2f10200-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Img jsCrop jsArtist">
                                            <img className="jsNewImage" alt=""
                                                 src="http://image.catalog.zunes.tk/v3.2/image/29a3dd3a-211b-4252-a943-3c47d1511a20?resize=false&amp;height=60"/>
                                        </a>
                                    </td>
                                    <td className="Description">
                                        <a href="artist/Rihanna/e2f10200-0200-11db-89ca-0019b92a3933"
                                           className="Title"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;e2f10200-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"><strong>Rihanna</strong></a>
                                    </td>
                                    <td className="Total"><strong>6,035</strong> plays</td>
                                </tr>
                                <tr className="jsTrack TopSongs" purchaseinfo=""
                                    mediainfo="cba21000-0200-11db-89ca-0019b92a3933#song#" sendinfo="">
                                    <td className="Image">
                                        <a href="artist/Ed-Sheeran/cba21000-0200-11db-89ca-0019b92a3933"
                                           mediainfo="cba21000-0200-11db-89ca-0019b92a3933#artist#Ed Sheeran"
                                           learninfo="artist/Ed-Sheeran/cba21000-0200-11db-89ca-0019b92a3933"
                                           mixviewinfo="displayObject=artist,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%22%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22cba21000-0200-11db-89ca-0019b92a3933%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104"
                                           hasfollowed="false"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;cba21000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Img jsCrop jsArtist">
                                            <img className="jsNewImage" alt=""
                                                 src="http://image.catalog.zunes.tk/v3.2/image/04f67394-fa47-4a49-962a-f02343086392?resize=false&amp;height=60"/>
                                        </a>
                                    </td>
                                    <td className="Description"><a
                                        href="artist/Ed-Sheeran/cba21000-0200-11db-89ca-0019b92a3933"
                                        className="Title"
                                        purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;cba21000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                        <strong>Ed Sheeran</strong>
                                    </a></td>
                                    <td className="Total"><strong>4,812</strong> plays</td>
                                </tr>
                                <tr className="jsTrack TopSongs" purchaseinfo=""
                                    mediainfo="215f0000-0200-11db-89ca-0019b92a3933#song#" sendinfo="">
                                    <td className="Image">
                                        <a href="artist/Nickelback/215f0000-0200-11db-89ca-0019b92a3933"
                                           mediainfo="215f0000-0200-11db-89ca-0019b92a3933#artist#Nickelback"
                                           learninfo="artist/Nickelback/215f0000-0200-11db-89ca-0019b92a3933"
                                           mixviewinfo="displayObject=artist,json=%7b%22metadata%22%3a%7b%22zune%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocial.zune.net%22%7d%2c%22socialapi%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bsocialapi.zune.net%22%7d%2c%22catalog%22%3a%7b%22webbase%22%3a%22http%26%2358%3b%26%2347%3b%26%2347%3bcatalog.zune.net%26%2347%3bv1.2%26%2347%3ben-GB%26%2347%3b%22%7d%7d%2c%22album%22%3a%7b%22id%22%3a%22%22%7d%2c%22artist%22%3a%7b%22id%22%3a%22215f0000-0200-11db-89ca-0019b92a3933%22%7d%2c%22profile%22%3a%7b%22zuneTag%22%3a%22%22%7d%7d#/xweb/lx/xap/MixView.xap?ver=11122104"
                                           hasfollowed="false"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;215f0000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Img jsCrop jsArtist">
                                            <img className="jsNewImage" alt=""
                                                 src="http://image.catalog.zunes.tk/v3.2/image/76f39c02-3de8-4f74-a7f4-04103ca5f0a3?resize=false&amp;height=60"/>
                                        </a>
                                    </td>
                                    <td className="Description">
                                        <a href="artist/Nickelback/215f0000-0200-11db-89ca-0019b92a3933"
                                           className="Title"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;215f0000-0200-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}">
                                            <strong>Nickelback</strong>
                                        </a>
                                    </td>
                                    <td className="Total"><strong>4,571</strong> plays</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="NarrowerColumn">
                        <div id="_ccm" className="block b_Block">
                            <div id="XbcPageFragment">
                                <div className="XbcChrome" style={{width: 310}}>
                                    <div className="XbcWpColumnGroup" style={{marginTop: 0, marginBottom: 10}}>
                                        <table className="XbcLayoutTable">
                                            <tbody>
                                            <tr className="XbcLayoutRow">
                                                <td className="XbcLayoutCell">
                                                    {/*<script type="text/javascript">
                                                        var c = 0;
                                                        setTimeout("wt()", 500
                                                    )
                                                    ;
                                                        function wt(){
                                                        c++;
                                                        try{
                                                        dcsMultiTrack('DCS.dcsuri','/fragments/ccm/music/genrelanding/zpsignup.htm ','WT.ti',
                                                        'Music%20Genrelanding%20zpsignup');
                                                    }
                                                        catch(err){
                                                        if(c<3){
                                                        setTimeout("wt()",500);
                                                    }
                                                    }
                                                    }
                                                    </script>*/}
                                                </td>
                                                <td className="XbcDownrule">
                                                    <div style={{width: 0}}/>
                                                </td>
                                                <td className="XbcLayoutCell">
                                                    <div className="XbcChrome">
                                                        <div className="XbcWpFlash">
                                                            <a href="https://live.zune.net/account/buySubscription">
                                                                <img width="300" height="250"
                                                                     src="300x250_ccm_signup_v1_enu.jpg"
                                                                     alt="Image: Sign up for free"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div id="_mostActive"
                             className="block b_istMostActiveList mostActiveBlock MediaListWraper MediaListContainer NarrowViewWrapper">
                            <h2>
                                <p>most played</p>
                            </h2>

                            <div className="Pivot">
                                <a href="#"
                                   onClick="ajaxLoader('_mostActive','/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                   className="Selected">top songs</a>
                                <span
                                    style={{display: "none"}}>/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                                <a href="#"
                                   onClick="ajaxLoader('_mostActive','/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=albums&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                   className="">top albums</a>
                                <span
                                    style={{display: "none"}}>/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=albums&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                            </div>
                            <div className="TransparentWrapper">
                                <div className="Pivot">
                                    <a href="#"
                                       onClick="ajaxLoader('_mostActive','/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=ThisWeek&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                       className="Selected">This week</a>
                                    <span
                                        style={{display: "none"}}>/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=ThisWeek&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                                    <a href="#"
                                       onClick="ajaxLoader('_mostActive','/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=AllTime&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;');return false;"
                                       className="">All time</a>
                                    <span
                                        style={{display: "none"}}>/frag/ArtistMostActiveList/?PurchaseBIContextGuidKey=&amp;TimePivot=AllTime&amp;Count=&amp;UseSpecialIcons=&amp;ChartType=tracks&amp;AlbumCount=&amp;PurchaseBIContext=TopArtistAlbumTrack&amp;ArtistId=&amp;GenreId=&amp;IsLandingPage=&amp;IdType=&amp;blockName=ArtistMostActiveList&amp;id=_mostActive&amp;PageIndex=&amp;EndMarker=&amp;StartMarker=&amp;PrevClicked=&amp;</span>
                                </div>
                            </div>
                            <table className="MediaList">
                                <tbody>
                                <tr>
                                    <td className="SongsPlayAll" colSpan={3}>
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayAllBtn" title="Play all"
                                                   style={{cursor: "pointer"}}>&nbsp;</a></span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddAllBtn"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a></span>
                                        </div>
                                        <span className="playallLabel">play all</span>
                                    </td>
                                </tr>
                                <tr className="jsTrack NarrowMostPlayedSongs"
                                    mediainfo="7db5f306-0100-11db-89ca-0019b92a3933#song#We Found Love"
                                    sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;7db5f306-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;song&quot;,&quot;trackName&quot;:&quot;We Found Love&quot;,&quot;artistName&quot;:&quot;Rihanna&quot;,&quot;albumName&quot;:&quot;We Found Love&quot;,&quot;albumArtUrl&quot;:&quot;\x2fAlbum\x2fGetAlbumImageUrl.ashx\x3faid\x3d7cb5f306-0100-11db-89ca-0019b92a3933&quot;,&quot;messageTitle&quot;:&quot;send this song&quot;}">
                                    <td className="PlayControl">
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayBtn"
                                                   mediainfo="7db5f306-0100-11db-89ca-0019b92a3933#track#We Found Love"
                                                   title="Preview"
                                                   style={{cursor: "pointer"}}>&nbsp;</a></span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddBtn"
                                                   mediainfo="7db5f306-0100-11db-89ca-0019b92a3933#track#We Found Love"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a></span>
                                        </div>
                                    </td>
                                    <td className="Description">
                                        <a href="http://web.archive.orgalbum/Rihanna/We-Found-Love/7cb5f306-0100-11db-89ca-0019b92a3933/details"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;7db5f306-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Title">We Found Love</a>
                                        <div><a
                                            href="artist/Rihanna/e2f10200-0200-11db-89ca-0019b92a3933"
                                            className="Name">Rihanna</a></div>
                                    </td>
                                    <td className="Total">
                                        <span className="content"><strong>1,163</strong> plays</span>
                                        <div className="altContent">
                                            <span>
                                                <a purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;7db5f306-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                                   cookiedomain=".zunes.tk"
                                                   href="http://www.bing.com/shopping/search?q=We Found Love Rihanna&amp;go=&amp;form=QBRE"
                                                   className="jsBuybtn pink btnsmall" canpurchase="true"
                                                   mediainfo="7db5f306-0100-11db-89ca-0019b92a3933#track#" title="">
                                                    <span className="btntip"/>
                                                    <span className="btntext">Buy</span>
                                                </a>
                                            </span>
                                            <span>
                                                <a style={{display: "block"}} onClick={event => false}
                                                   href="#" className="jsMenuGrip btnsmall pink">
                                                    <span className="btntip"/>
                                                    <span className="btntext">&nbsp;
                                                        <img className="downarrow" src="ico_menu_downarrow_white.png"/>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="jsTrack NarrowMostPlayedSongs"
                                    mediainfo="02e7e506-0100-11db-89ca-0019b92a3933#song#Moves Like Jagger (Studio Recording From The Voice Performance)"
                                    sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;02e7e506-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;song&quot;,&quot;trackName&quot;:&quot;Moves Like Jagger \x28Studio Recording From The Voice Performance\x29&quot;,&quot;artistName&quot;:&quot;Maroon 5&quot;,&quot;albumName&quot;:&quot;Moves Like Jagger&quot;,&quot;albumArtUrl&quot;:&quot;\x2fAlbum\x2fGetAlbumImageUrl.ashx\x3faid\x3d00e7e506-0100-11db-89ca-0019b92a3933&quot;,&quot;messageTitle&quot;:&quot;send this song&quot;}">
                                    <td className="PlayControl">
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayBtn"
                                                   mediainfo="02e7e506-0100-11db-89ca-0019b92a3933#track#Moves Like Jagger (Studio Recording From The Voice Performance)"
                                                   title="Preview"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddBtn"
                                                   mediainfo="02e7e506-0100-11db-89ca-0019b92a3933#track#Moves Like Jagger (Studio Recording From The Voice Performance)"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="Description">
                                        <a href="http://web.archive.orgalbum/Maroon-5/Moves-Like-Jagger/00e7e506-0100-11db-89ca-0019b92a3933/details"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;02e7e506-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Title">
                                            Moves Like Jagger (Studio Recording From The Voice Performance)
                                        </a>
                                        <div>
                                            <a href="artist/Maroon-5/fadc0000-0200-11db-89ca-0019b92a3933"
                                               className="Name">Maroon 5</a>
                                        </div>
                                    </td>
                                    <td className="Total">
                                        <span className="content"><strong>822</strong> plays</span>
                                        <div className="altContent">
                                            <span>
                                                <a purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;02e7e506-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                                   cookiedomain=".zunes.tk"
                                                   href="http://www.bing.com/shopping/search?q=Moves Like Jagger Maroon 5&amp;go=&amp;form=QBRE"
                                                   className="jsBuybtn pink btnsmall" canpurchase="true"
                                                   mediainfo="02e7e506-0100-11db-89ca-0019b92a3933#track#" title="">
                                                    <span className="btntip"/>
                                                    <span className="btntext">Buy</span>
                                                </a>
                                            </span>
                                            <span>
                                                <a style={{display: "block"}} onClick={event => false}
                                                   href="#" className="jsMenuGrip btnsmall pink">
                                                    <span className="btntip"/>
                                                    <span className="btntext">&nbsp;
                                                        <img className="downarrow" src="ico_menu_downarrow_white.png"/>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="jsTrack NarrowMostPlayedSongs"
                                    mediainfo="bb11f006-0100-11db-89ca-0019b92a3933#song#Lego House"
                                    sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;bb11f006-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;song&quot;,&quot;trackName&quot;:&quot;Lego House&quot;,&quot;artistName&quot;:&quot;Ed Sheeran&quot;,&quot;albumName&quot;:&quot;\x2b&quot;,&quot;albumArtUrl&quot;:&quot;\x2fAlbum\x2fGetAlbumImageUrl.ashx\x3faid\x3db411f006-0100-11db-89ca-0019b92a3933&quot;,&quot;messageTitle&quot;:&quot;send this song&quot;}">
                                    <td className="PlayControl">
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayBtn"
                                                   mediainfo="bb11f006-0100-11db-89ca-0019b92a3933#track#Lego House"
                                                   title="Preview"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddBtn"
                                                   mediainfo="bb11f006-0100-11db-89ca-0019b92a3933#track#Lego House"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="Description">
                                        <a href="http://web.archive.orgalbum/Ed-Sheeran/+/b411f006-0100-11db-89ca-0019b92a3933/details"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;bb11f006-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Title">Lego House</a>
                                        <div>
                                            <a href="artist/Ed-Sheeran/cba21000-0200-11db-89ca-0019b92a3933"
                                               className="Name">Ed Sheeran</a>
                                        </div>
                                    </td>
                                    <td className="Total">
                                        <span className="content"><strong>798</strong> plays</span>
                                        <div className="altContent">
                                            <span>
                                                <a purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;bb11f006-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                                   cookiedomain=".zunes.tk"
                                                   href="http://www.bing.com/shopping/search?q=+ Ed Sheeran&amp;go=&amp;form=QBRE"
                                                   className="jsBuybtn pink btnsmall" canpurchase="true"
                                                   mediainfo="bb11f006-0100-11db-89ca-0019b92a3933#track#" title="">
                                                    <span className="btntip"/>
                                                    <span className="btntext">Buy</span>
                                                </a>
                                            </span>
                                            <span>
                                                <a style={{display: "block"}} onClick={event => false}
                                                   href="#" className="jsMenuGrip btnsmall pink">
                                                    <span className="btntip"/>
                                                    <span className="btntext">&nbsp;
                                                        <img className="downarrow" src="ico_menu_downarrow_white.png"/>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="jsTrack NarrowMostPlayedSongs"
                                    mediainfo="c6b95006-0100-11db-89ca-0019b92a3933#song#Dying Breed"
                                    sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;c6b95006-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;song&quot;,&quot;trackName&quot;:&quot;Dying Breed&quot;,&quot;artistName&quot;:&quot;Five Finger Death Punch&quot;,&quot;albumName&quot;:&quot;Dying Breed&quot;,&quot;albumArtUrl&quot;:&quot;\x2fAlbum\x2fGetAlbumImageUrl.ashx\x3faid\x3de9ba5406-0100-11db-89ca-0019b92a3933&quot;,&quot;messageTitle&quot;:&quot;send this song&quot;}">
                                    <td className="PlayControl">
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayBtn"
                                                   mediainfo="c6b95006-0100-11db-89ca-0019b92a3933#track#Dying Breed"
                                                   title="Preview"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddBtn"
                                                   mediainfo="c6b95006-0100-11db-89ca-0019b92a3933#track#Dying Breed"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="Description">
                                        <a href="http://web.archive.orgalbum/Five-Finger-Death-Punch/Dying-Breed/e9ba5406-0100-11db-89ca-0019b92a3933/details"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;c6b95006-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Title">Dying Breed</a>
                                        <div>
                                            <a href="artist/Five-Finger-Death-Punch/a6ac0500-0200-11db-89ca-0019b92a3933"
                                               className="Name">Five Finger Death Punch</a>
                                        </div>
                                    </td>
                                    <td className="Total">
                                        <span className="content"><strong>657</strong> plays</span>
                                        <div className="altContent">
                                            <span>
                                                <a purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;c6b95006-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                                   cookiedomain=".zunes.tk"
                                                   href="http://www.bing.com/shopping/search?q=Dying Breed Five Finger Death Punch&amp;go=&amp;form=QBRE"
                                                   className="jsBuybtn pink btnsmall" canpurchase="true"
                                                   mediainfo="c6b95006-0100-11db-89ca-0019b92a3933#track#" title="">
                                                    <span className="btntip"/>
                                                    <span className="btntext">Buy</span></a>
                                            </span>
                                            <span>
                                                <a style={{display: "block"}} onClick={event => false}
                                                   href="#" className="jsMenuGrip btnsmall pink">
                                                    <span className="btntip"/>
                                                    <span className="btntext">&nbsp;
                                                        <img className="downarrow"
                                                             src="ico_menu_downarrow_white.png"/>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="jsTrack NarrowMostPlayedSongs"
                                    mediainfo="7eaefa06-0100-11db-89ca-0019b92a3933#song#Paradise"
                                    sendinfo="{&quot;zuneTag&quot;:&quot;&quot;,&quot;recipientList&quot;:[{}],&quot;messageMediaId&quot;:&quot;7eaefa06-0100-11db-89ca-0019b92a3933&quot;,&quot;returnUrl&quot;:&quot;&quot;,&quot;reply&quot;:&quot;&quot;,&quot;messageSource&quot;:&quot;MyZune&quot;,&quot;messageType&quot;:&quot;song&quot;,&quot;trackName&quot;:&quot;Paradise&quot;,&quot;artistName&quot;:&quot;Coldplay&quot;,&quot;albumName&quot;:&quot;Mylo Xyloto&quot;,&quot;albumArtUrl&quot;:&quot;\x2fAlbum\x2fGetAlbumImageUrl.ashx\x3faid\x3d7caefa06-0100-11db-89ca-0019b92a3933&quot;,&quot;messageTitle&quot;:&quot;send this song&quot;}">
                                    <td className="PlayControl">
                                        <div className="ButtonWrap">
                                            <span className="playgrayicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsPlayBtn"
                                                   mediainfo="7eaefa06-0100-11db-89ca-0019b92a3933#track#Paradise"
                                                   title="Preview"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                            <span className="addicon">
                                                <a href="#" onClick={event => false}
                                                   className="jsAddBtn"
                                                   mediainfo="7eaefa06-0100-11db-89ca-0019b92a3933#track#Paradise"
                                                   title="Add to now playing"
                                                   style={{cursor: "pointer"}}>&nbsp;</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="Description">
                                        <a href="http://web.archive.orgalbum/Coldplay/Mylo-Xyloto/7caefa06-0100-11db-89ca-0019b92a3933/details"
                                           purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;7eaefa06-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                           className="Title">Paradise</a>
                                        <div>
                                            <a href="artist/Coldplay/0a190000-0200-11db-89ca-0019b92a3933"
                                               className="Name">Coldplay</a>
                                        </div>
                                    </td>
                                    <td className="Total">
                                        <span className="content"><strong>599</strong> plays</span>
                                        <div className="altContent">
                                            <span>
                                                <a purchasebiinfo="{ &quot;contextEvent&quot;: &quot;50&quot;, &quot;contextGuid&quot;:&quot;7eaefa06-0100-11db-89ca-0019b92a3933&quot;, &quot;picksContext&quot;:&quot;&quot;}"
                                                   cookiedomain=".zunes.tk"
                                                   href="http://www.bing.com/shopping/search?q=Mylo Xyloto Coldplay&amp;go=&amp;form=QBRE"
                                                   className="jsBuybtn pink btnsmall" canpurchase="true"
                                                   mediainfo="7eaefa06-0100-11db-89ca-0019b92a3933#track#" title="">
                                                    <span className="btntip"/>
                                                    <span className="btntext">Buy</span>
                                                </a>
                                            </span>
                                            <span>
                                                <a style={{display: "block"}} onClick={event => false}
                                                   href="#" className="jsMenuGrip btnsmall pink">
                                                    <span className="btntip"/>
                                                    <span className="btntext">&nbsp;
                                                        <img className="downarrow" src="ico_menu_downarrow_white.png"/>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
