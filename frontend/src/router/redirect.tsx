import React, {useEffect} from "react";
import routerCtrl from "./index";

interface IRedirectProps{
    to,
    push
}

function Redirect(props: IRedirectProps){
    const {to, push} = props;

    useEffect(() => {
        push ? routerCtrl.historyPush(to) : routerCtrl.historyReplace(to);
    }, []);

    return null;
};
