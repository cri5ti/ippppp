import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Games from "./views/games/games";
import PlayersList from "./views/players/players";
import {Shell} from "./views/shell/shell";

const App = () => (
    <Router>
        <Shell>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/games" component={Games}/>
                <Route path="/players" component={PlayersList}/>
            </Switch>
        </Shell>
    </Router>
);


const LandingPage = () => (
    <h1>Ping?</h1>
);



render(<App/>, document.getElementById("root"));
