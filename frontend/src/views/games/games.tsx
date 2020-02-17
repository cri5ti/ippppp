import React, {useEffect, useState} from "react";
import {API_URL} from "../../config";
import {BusyOverlay} from "../../ui/busy/busy";
import {cls} from "../../util/react";
import {Page} from "../shell/shell";

const css = require('./games.scss');

const Games = () => {
    const [game, setGames] = useState({loading: true, games: []});

    useEffect(() => {
        async function load() {
            const games = await (await fetch(API_URL + "/games")).json();
            setGames({ loading: false, games});
        }
        load();
    }, []);

    return (
        <Page title="Games">
            <div className="games">
                {game.loading && <BusyOverlay/>}
                {game.games.map((i,ix) => <GameItem game={i} key={ix}/>)}
            </div>
        </Page>
    )

};

const GameItem = ({game}) =>
    <div className={cls("game", game.ongoing && 'ongoing')}>
        <div className="player a">{game.player1}</div>
        <div className="score a">{game.score1}</div>
        <div className="vs"/>
        <div className="score b">{game.score2}</div>
        <div className="player b">{game.player2}</div>
    </div>;


export default Games;
