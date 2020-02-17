import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {BusyOverlay} from "../../ui/busy/busy";
import {Page} from "../shell/shell";
import {Player, playersApi} from "./players_api";

export const PlayerDetails = () => {
    const {code} = useParams();
    const [player, setPlayer] = useState<Player>(null);

    const history = useHistory();

    useEffect(() => {
        async function load() {
            const player = await playersApi.getOne(code);
            setPlayer(player);
        }
        load();
    }, []);

    async function onDelete() {
        const res = await playersApi.remove(player.code);
        if(!res) return;
        history.goBack();
    }

    if (!player) return <BusyOverlay/>;

    return (
        <Page title={player && player.description}>
            <nav>
                <BackLink/>
                <DefaultButton onClick={onDelete}>Delete</DefaultButton>
            </nav>

            {!player && <BusyOverlay/>}

            {player && <>
                {player.code}
            </>}

            <p>Details go here</p>
        </Page>
    );
};
