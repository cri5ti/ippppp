import React from "react";
import {cls} from "../../util/react";
import {Page} from "../shell/shell";
import {gamesApi} from "./games_api";
import {List} from "../../ui/list/list";

const css = require('./games.scss');

const Games = () => {
    return (
        <Page title="Games">
            <List data={gamesApi.getAll}
                  className={"games"}
                  itemRender={(i) => <GameItem game={i}/>}/>
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
