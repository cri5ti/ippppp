import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyRender} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {sessionApi, TSession, TSessionPlayers} from "../../api/sessions";
import {playersApi, TPlayer} from "../../api/players";
import {MultiSelect} from "../../ui/multi_select/multi_select";
import set = Reflect.set;

const css = require('./sessions.scss');


interface ISessionDetailsState {
    players: Array<TPlayer>;
    selectedPlayers?: {added: Array<TPlayer>, removed: Array<TPlayer>};
    sessionPlayers: Array<TPlayer>
}

export const SessionDetails = () => {
    const {code} = useParams();
    const [state, setState] = useState<ISessionDetailsState>({players: [], sessionPlayers: []});
    const {players, selectedPlayers, sessionPlayers} = state;

    const history = useHistory();

    const getOne = useCallback(() => sessionApi.getOne(code), [code]);

    useEffect(() => {
        (async () => {
            const session = await sessionApi.getOne(code);
            const players = await playersApi.getAll();

            const sessionPlayers: Array<TPlayer> = session.sessionPlayers.map(i => i.player);
            setState({...state, sessionPlayers, players});
        })();
    }, []);

    async function onDelete() {
        const res = await sessionApi.remove(code);
        if(!res) return;
        history.goBack();
    }

    async function onSave(){
        const addedSessionPlayers = selectedPlayers.added.map(i => ({playerCode: i.code, sessionCode: code}));
        const removedSessionPlayers = selectedPlayers.removed.map(i => ({playerCode: i.code, sessionCode: code}));

        await Promise.all([addedSessionPlayers.length && sessionApi.addPlayers(addedSessionPlayers), removedSessionPlayers.length && sessionApi.deletePlayers(removedSessionPlayers)]);
    }

    const onChangePlayers = (result) => {
        setState({...state, selectedPlayers: result})
    };

    return (
        <BusyRender<TSession> promise={getOne}>
            {(player) => (
                <Page title={player.description}>
                    <nav>
                        <BackLink/>
                        <DefaultButton onClick={onDelete}>Delete</DefaultButton>
                        <DefaultButton onClick={onSave}>Save</DefaultButton>
                    </nav>
                    <div>
                        {player.code}
                        <p>Details go here</p>
                    </div>
                    <MultiSelect<TPlayer> allItems={players}
                                          initialSelection={sessionPlayers}
                                          onChange={onChangePlayers}
                                          itemRender={(item => item.description)}/>
                </Page>
            )}
        </BusyRender>
    )
};

