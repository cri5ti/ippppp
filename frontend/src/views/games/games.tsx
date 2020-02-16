import React, {useEffect, useState} from "react";
import {API_URL} from "../../config";
import {cls} from "../../util/react";

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
        <div className="games">
            {game.loading && <div>Loading</div>}
            {game.games.map((i,ix) => <Game game={i} key={ix}/>)}
        </div>
    )

};

const Game = ({game}) =>
    <div className={cls("game", game.ongoing && 'ongoing')}>
        <div className="player a">{game.player1}</div>
        <div className="score a">{game.score1}</div>
        <div className="vs"/>
        <div className="score b">{game.score2}</div>
        <div className="player b">{game.player2}</div>
    </div>;


export default Games;
