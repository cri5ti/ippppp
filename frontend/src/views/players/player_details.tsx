import React, {useCallback} from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyRender} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {Player, playersApi} from "../../api/players";


export const PlayerDetails = () => {
    const {code} = useParams();
    const history = useHistory();

    const getOne = useCallback(() => playersApi.getOne(code), [code]);

    async function onDelete() {
        const res = await playersApi.remove(code);
        if(!res) return;
        history.goBack();
    }

    return (
        <BusyRender<Player> promise={getOne}>
            {(player) => (
                <Page title={player.description}>
                    <nav>
                        <BackLink/>
                        <DefaultButton onClick={onDelete}>Delete</DefaultButton>
                    </nav>

                    <div>
                        {player.code}
                        <p>Details go here</p>
                    </div>
                </Page>
            )}
        </BusyRender>
    )
};
