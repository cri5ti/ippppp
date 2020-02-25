import React, {useCallback} from "react";
import {Link, Route, Switch, useRouteMatch, withRouter} from "react-router-dom";
import {Page} from "../shell/shell";
import {List} from "../../ui/list/list";
import {Session, sessionApi} from "../../api/sessions";
import {CreateSession} from "./create_session";
import {PlayerDetails} from "../players/player_details";
import {SessionDetails} from "./session_details";

const css = require('./sessions.scss');

const SessionsPage = () => {
    const {path} = useRouteMatch();

    //todo session details
    return (
        <Switch>
            <Route path={`${path}/create`}>
                <CreateSession/>
            </Route>
            <Route path={`${path}/:code`}>
                <SessionDetails/>
            </Route>
            <Route>
                <SessionsList/>
            </Route>
        </Switch>
    );
};


const SessionsList = withRouter(({history}) => {
    const {url} = useRouteMatch();
    const getAll = useCallback(() => sessionApi.getAll(), []);

    return (
        <Page title="Sessions">
            <nav>
                <Link to={`${url}/create`}>Create session</Link>
            </nav>

            <div className="sessions">
                <List itemRender={session => <SessionItem {...session}/>}
                      data={getAll}
                      onItemClick={(i) => history.push(url + '/' + i.code)}/>
            </div>
        </Page>
    )
});


const SessionItem = (props: Session) => {
    const {description, minGamesRequired, isActive} = props;

    return (
        <div className="session">
            <span className="name">{description}</span>
            {/*<span className="name">{minGamesRequired}</span>*/}
            {/*<span className="name">{isActive}</span>*/}
        </div>
    )
};

export default SessionsPage;
