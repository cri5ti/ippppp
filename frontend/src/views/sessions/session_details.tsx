import React, {ReactElement, ReactNode, useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyRender} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {sessionApi, TSession, TSessionPlayers} from "../../api/sessions";
import {playersApi, TPlayer} from "../../api/players";
import {List} from "../../ui/list/list";
import {cls} from "../../util/react";
import {MultiSelect} from "../../ui/multi_select/multi_select";

const css = require('./sessions.scss');

export const SessionDetails = () => {
    const {code} = useParams();
    const [state, setState] = useState<{players: Array<TPlayer>, selectedPlayers: Set<TPlayer>, sessionPlayers: Array<TPlayer>}>({players: [], selectedPlayers: new Set([]), sessionPlayers: []});
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
        const sessionPlayers: Array<TSessionPlayers> = Array.from(selectedPlayers).map(i => ({playerCode: i.code, sessionCode: code}));
        await sessionApi.addPlayer(sessionPlayers);
    }

    function onItemClick(item) {
        selectedPlayers.has(item) ? selectedPlayers.delete(item) : selectedPlayers.add(item);
        setState({...state, selectedPlayers: new Set([...selectedPlayers])})
    }

    // const renderMultiSelectItem = (item, selectedItems) => {
    //     const isSelected =
    //
    //     return (
    //         <label htmlFor={item.code}
    //                className={cls(selectedItems.has(item.code) && css.selected)}>
    //             <input type="checkbox" name={item.code} id={item.code} che/>
    //             {item.description}
    //         </label>
    //     )
    // };

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
                                          itemRender={(item => item.description)}/>
                </Page>
            )}
        </BusyRender>
    )
};

