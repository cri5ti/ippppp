import React, {useCallback} from "react";
import {cls} from "../../util/react";
import {Page} from "../shell/shell";
import {Game, gamesApi} from "./games_api";
import {List} from "../../ui/list/list";
import {Link, Route, Switch, useRouteMatch, withRouter} from "react-router-dom";
import {CreateGame} from "./create_game";

const css = require('./games.scss');

const GamesPage = () => {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/create`}>
                <CreateGame/>
            </Route>
            {/*<Route path={`${path}/:code`}>*/}
            {/*    <GameDetails/>*/}
            {/*</Route>*/}
            <Route>
                <GamesList/>
            </Route>
        </Switch>
    );
};

const GamesList = withRouter(({history}) => {
    const {url} = useRouteMatch();
    const getAll = useCallback(() => gamesApi.getAll(), []);

    return (
        <Page title="Games">
            <nav>
                <Link to={`${url}/create`}>Create game</Link>
            </nav>

            <div className="games">
                <List itemRender={game => <GameItem {...game}/>}
                      data={getAll}
                      onItemClick={(i) => history.push(url + '/' + i.code)}/>
            </div>
        </Page>
    )
});



const GameItem = (props: Game) =>
    <div className={cls("game", props.isActive && 'ongoing')}>
        <div className="player a">{props.playerOneCode}</div>
        <div className="score a">{props.scoreOne}</div>
        <div className="vs"/>
        <div className="score b">{props.scoreTwo}</div>
        <div className="player b">{props.playerTwoCode}</div>
    </div>;


export default GamesPage;
