import React from "react";
import {withRouter} from "react-router";

export const BackLink = withRouter(({history}) => (
    <a href="#"
       className="button icon-left"
       onClick={history.goBack}
    >
        &lt; Back
    </a>
));

export const DefaultButton = ({children, onClick}) => (
    <button onClick={onClick} className="default">
        {children}
    </button>
);
