import React, {useCallback, useState} from "react";
import {withRouter} from "react-router";
import {BackLink, DefaultButton} from "../../ui/back_button";
import {Page} from "../shell/shell";
import {BusyOverlay} from "../../ui/busy/busy";
import {Session, sessionApi} from "../../api/sessions";

export const CreateSession = withRouter(({history}) => {
    const [form, setForm] = useState<Partial<Session>>({});
    const [busy, setBusy] = useState(false);

    const onSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        setBusy(true);
        await sessionApi.create(form);
        setBusy(false);
        history.replace('/sessions');
    }, [form]);

    return (
        <Page title="New session">
            <nav>
                <DefaultButton onClick={onSubmit}>Create</DefaultButton>
                <BackLink/>
            </nav>

            <form className="form">
                {busy && <BusyOverlay/>}

                <label htmlFor="description">Description:</label>
                <input required={true} type="text" id="description" name="description" value={form.description}
                       onChange={(e) => setForm({...form, description: e.target.value})}/>

                <label htmlFor="minimum">Minimum games required:</label>
                <input required={true} type="number" id="minimum" name="minimum" value={form.minGamesRequired}
                       onChange={(e) => setForm({...form, minGamesRequired: parseInt(e.target.value)})}/>
            </form>
        </Page>
    )
});
