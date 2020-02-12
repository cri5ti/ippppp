import React from 'react';
import {render} from 'react-dom';
import Games from "./views/games/games";
import {Route} from "./router/route";

const App = () => (
    <>
        <Route exact path={"/"} component={() => <div style={{height: 300}}>Welcome to IP55555!!</div>}/>
        <Route path={"/games"} component={Games}/>
        {/*<Route path={"/players"} component={Players}/>*/}
    </>
);


render(<App/>, document.getElementById("root"));
