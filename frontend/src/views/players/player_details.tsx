import React from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyRender} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {Player, playersApi} from "./players_api";

export const PlayerDetails = () => {
    const {code} = useParams();
    const history = useHistory();

    async function getPlayer(){
        return await playersApi.getOne(code);
    }

    async function onDelete() {
        const res = await playersApi.remove(code);
        if(!res) return;
        history.goBack();
    }

    return (
        <BusyRender<Player> promise={getPlayer()}>
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
