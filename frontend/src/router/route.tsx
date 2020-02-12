import React, {useEffect, useState} from "react";
import routerCtrl from "./index";

interface IRouteProps {
    path,
    exact?,
    component,
    render?
}

export function Route(props: IRouteProps) {
    const {path, exact, component, render} = props;
    const [, forceUpdate] = useState();

    useEffect(() => {
        addEventListener('popstate', forceUpdate);

        //clean up phase ~ componentWillUnmount
        return () => {
            removeEventListener('popstate', forceUpdate)
        }

    }, []);

    const match = routerCtrl.matchPath(location.pathname, { path, exact });

    if (!match) return null;

    if (component){
        return React.createElement(component, {match});
    }

    if (render){
        return render({
            match
        });
    }
    return null
}
