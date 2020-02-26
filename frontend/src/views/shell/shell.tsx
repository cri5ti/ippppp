import React from "react";
import {NavLink} from "react-router-dom";

require('./shell.scss');

export const Shell = ({children}) => (
    <div className="shell">
        <header>
            <h1>Ping?</h1>
            <nav>
                <NavLink to={"/games"}>Games</NavLink>
                <NavLink to={"/players"}>Players</NavLink>
                <NavLink to={"/sessions"}>Sessions</NavLink>
            </nav>
        </header>
        <main>
            {children}
        </main>
    </div>
);

export const Page = ({title, children}) => (
    <div className="page">
        <header>{title}</header>

        <main>
            {children}
        </main>
    </div>
);
