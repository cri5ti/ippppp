import React, {useCallback, useState} from "react";
import {withRouter} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {Page} from "../shell/shell";
import {playersApi} from "../../api/players";
import {BusyOverlay} from "../../ui/busy/busy";

export const CreatePlayer = withRouter(({history}) => {
    const [form, setForm] = useState<{ name: string, email: string }>({name: null, email: null});
    const [busy, setBusy] = useState(false);

    const onSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        setBusy(true);
        await playersApi.create({Email: form.email, Description: form.name});
        setBusy(false);
        history.replace('/players');
    }, [form]);

    return (
        <Page title="New player">
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
