import * as React from 'react';
import {render} from 'react-dom';
import {Games} from "./views/games";


const App = () => (
    <Games/>
);

render(<App/>, document.body.appendChild(document.createElement('div')));
