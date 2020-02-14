import React from 'react';
import {render} from 'react-dom';
import Games from "./views/games/games";
import Players from "./views/players/players";
import {Route} from "./router/route";
import {Link} from "./router/link";

const App = () => (
    <>
        <Route exact path={"/"} component={LandingPage}/>
        <Route path={"/games"} component={Games}/>
        <Route path={"/players"} component={Players}/>
    </>
);

function LandingPage(){
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flex: 1}}>
            Welcome to IP55555!!
            <Link to={"/games"}>Go to awesome games!</Link>
            <Link to={"/players"}>Go to awesome players!</Link>
        </div>
    );
}


render(<App/>, document.getElementById("root"));
