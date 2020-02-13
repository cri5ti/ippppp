import React from 'react';
import {render} from 'react-dom';
import Games from "./views/games/games";
import {Route} from "./router/route";
import {Link} from "./router/link";

const App = () => (
    <>
        <Route exact path={"/"} component={LandingPage}/>
        <Route path={"/games"} component={Games}/>
        {/*<Route path={"/players"} component={Players}/>*/}
    </>
);

function LandingPage(){
    return (
        <div>
            Welcome to IP55555!!
            <Link to={"/games"}>Go to games!</Link>
        </div>
    );
}


render(<App/>, document.getElementById("root"));
