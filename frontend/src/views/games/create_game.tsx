import React, {useCallback, useState} from "react";
import {withRouter} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {Page} from "../shell/shell";
import {BusyOverlay} from "../../ui/busy/busy";
import {gamesApi} from "./games_api";

export const CreateGame = withRouter(({history}) => {
    const [form, setForm] = useState<{ name: string, email: string }>({name: null, email: null});
    const [busy, setBusy] = useState(false);

    const onSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        setBusy(true);
        await gamesApi.create({Email: form.email, Description: form.name});
        setBusy(false);
        history.replace('/players');
    }, [form]);

    return (
        <Page title="New game">
            <nav>
                <DefaultButton onClick={onSubmit}>Create</DefaultButton>
                <BackLink/>
            </nav>

            <form className="form">
                {busy && <BusyOverlay/>}

                <label htmlFor="name">Name:</label>
                <input required={true} type="text" id="name" name="name" value={form.name}
                       onChange={(e) => setForm({...form, name: e.target.value})}/>

                <label htmlFor="email">Email:</label>
                <input required={true} type="email" id="email" title="Email" value={form.email}
                       onChange={(e) => setForm({...form, email: e.target.value})}/>
            </form>
        </Page>
    )
});
