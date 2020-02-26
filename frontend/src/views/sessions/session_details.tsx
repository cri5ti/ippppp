import React, {useCallback, useState} from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyRender} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {sessionApi, TSession, TSessionPlayers} from "../../api/sessions";
import {playersApi, TPlayer} from "../../api/players";
import {List} from "../../ui/list/list";


export const SessionDetails = () => {
    const {code} = useParams();
    const [state, setState] = useState<{players: Array<TPlayer>, selectedPlayers: Set<TPlayer>}>({players: [], selectedPlayers: new Set([])});
    const {players, selectedPlayers} = state;

    const history = useHistory();

    const getOne = useCallback(() => sessionApi.getOne(code), [code]);

    const getAllPlayers = useCallback(() => playersApi.getAll(),[]);

    async function onDelete() {
        const res = await sessionApi.remove(code);
        if(!res) return;
        history.goBack();
    }

    async function onSave(){
        const sessionPlayers: Array<TSessionPlayers> = Array.from(selectedPlayers).map(i => ({playerCode: i.code, sessionCode: i.code}));
        await sessionApi.addPlayer(sessionPlayers);
    }

    function onItemClick(item) {
        selectedPlayers.has(item) ? selectedPlayers.delete(item) : selectedPlayers.add(item);
        setState({...state, selectedPlayers: new Set([...selectedPlayers])})
    }

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
                    <List<TPlayer> data={getAllPlayers} itemRender={(i) => (
                        <label htmlFor={i.code}>
                            <input type={"checkbox"} checked={selectedPlayers.has(i)} id={i.code} name={i.code}/>
                            {i.description}
                        </label>
                    )} onItemClick={onItemClick}/>
                </Page>
            )}
        </BusyRender>
    )
};
