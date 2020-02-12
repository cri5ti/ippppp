import React from "react";
import routerCtrl from "./index";

interface ILinkProps{
    to,
    replace,
    children
}

export function Link(props: ILinkProps){
    const {to, replace, children} = props;

    function handleClick(event) {
        event.preventDefault();
        replace ? routerCtrl.historyReplace(to) : routerCtrl.historyPush(to)
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    )
}
