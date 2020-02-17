import React from "react";
import {Link, Route, Switch, useRouteMatch, withRouter} from "react-router-dom";
import {List} from "../../ui/list/list";
import {md5} from "../../util/md5";
import {Page} from "../shell/shell";
import {CreatePlayer} from "./create_player";
import {PlayerDetails} from "./player_details";
import {Player, playersApi} from "./players_api";

const css = require('./players.scss');

const PlayersPage = () => {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/create`}>
                <CreatePlayer/>
            </Route>
            <Route path={`${path}/:code`}>
                <PlayerDetails/>
            </Route>
            <Route>
                <PlayersList/>
            </Route>
        </Switch>
    );
};


const PlayersList = withRouter(({history}) => {
    const {url} = useRouteMatch();

    return (
        <Page title="Players">
            <nav>
                <Link to={`${url}/create`}>Create player</Link>
            </nav>

            <div className="players">
                <List itemRender={player => <PlayerItem {...player}/>}
                      data={playersApi.getAll()}
                      onItemClick={(i) => history.push(url + '/' + i.code)}/>
            </div>
        </Page>
    )
});


const PlayerItem = (props: Player) => {
    const {description, email} = props;

    return (
        <div className="player">
            <Gravatar email={email} size={64}/>
            <span className="name">{description}</span>
        </div>
    )
};

const Gravatar = ({email, size, ...rest}) => <img src={`https://secure.gravatar.com/avatar/${md5(email)}?size=${size}`} {...rest}/>

export default PlayersPage;
