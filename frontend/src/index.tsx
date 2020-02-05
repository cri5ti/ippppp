import * as React from 'react';
import {render} from 'react-dom';
import {Shell} from "./shell/shell";


const App = () => (
    <Shell/>
);

render(<App/>, document.body.appendChild(document.createElement('div')));
