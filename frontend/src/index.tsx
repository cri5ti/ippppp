import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import PlayersList from "./views/players/players";
import {Shell} from "./views/shell/shell";
import Sessions from "./views/sessions/sessions";
import GamesPage from "./views/games/games";

const App = () => (
    <Router>
        <Shell>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/sessions" component={Sessions}/>
                <Route path="/games" component={GamesPage}/>
                <Route path="/players" component={PlayersList}/>
            </Switch>
        </Shell>
    </Router>
);


const LandingPage = () => (
    <h1>Ping?</h1>
);



render(<App/>, document.getElementById("root"));
