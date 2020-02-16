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
            <h1>Ping?</h1>
            <li><Link to={"/games"}>Games</Link></li>
            <li><Link to={"/players"}>Players</Link></li>
        </div>
    );
}


render(<App/>, document.getElementById("root"));
