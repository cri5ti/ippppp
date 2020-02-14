import React, {useEffect, useState} from "react";
import {cls} from "../../util/react";
import {List} from "../../ui/list/list";

const css = require('./players.scss');

interface IPlayer {
    description: string;
    email: string
}

const Players = () => {
    const [player, setGames] = useState({loading: true, players: []});

    useEffect(() => {
        async function load() {
            const players = await (await fetch("/api/players")).json();
            setGames({loading: false, players});
        }

        load();
    }, []);

    return (
        <div className="players">
            {player.loading && <div>Loading</div>}
            <PlayerForm/>
            <List<IPlayer> component={(player, key) => <Player key={key} {...player}/>}
                           header={{email: "Email", description: "Name"}}
                           data={player.players}/>
        </div>
    )
};


interface IPlayerFormState {
    name: string,
    email: string
}

function PlayerForm() {
    const [form, setForm] = useState<IPlayerFormState>({} as any);

    function onSubmit(e) {
        e.preventDefault();
        (async () => {
            const players = await (await fetch("/api/players", {
                method: "PUT",
                body: JSON.stringify({Email: form.email, Description: form.name}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })).json();
            console.log(players);
        })();


        console.log(form)
    }

    return (
        <form className={"form"} title={"New player"}>
            <label htmlFor="name">Name:</label>
            <input required={true} type={"text"} id="name" name={"name"} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
            <label htmlFor="email">Email:</label>
            <input type={"email"} id="email" title={"Email"} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
            <button onClick={onSubmit}>Submit</button>
        </form>
    )
};


const Player = (props: IPlayer) => {
    const {description, email} = props;

    return (
        <div className={cls("player")}>
            <div>{description}</div>
            <div>{email}</div>
        </div>
    )
};


export default Players;
