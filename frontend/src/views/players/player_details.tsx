import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {API_URL} from "../../config";
import {BackLink} from "../../ui/back_button";
import {BusyOverlay} from "../../ui/busy";
import {Page} from "../shell/shell";

type Player = {
    code: string;
    description: string;
    email: string;
    wins: number;
    losses: number;
}

export const PlayerDetails = () => {
    const {code} = useParams();
    const [player, setPlayer] = useState<Player>(null);

    useEffect(() => {
        async function load() {
            const player = await (await fetch(API_URL + "/players/" + code)).json();
            setPlayer(player);
        }
        load();
    }, []);

    if (!player) return <BusyOverlay/>;

    return (
        <Page title={player && player.description}>
            <nav>
                <BackLink/>
            </nav>

            {!player && <BusyOverlay/>}

            {player && <>
                {player.code}
            </>}

            <p>Details go here</p>
        </Page>
    );
};