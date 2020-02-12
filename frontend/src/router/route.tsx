import React, {useEffect} from "react";
import routerCtrl from "./index";

interface IRouteProps {
    path,
    exact?,
    component,
    render?
}

export function Route(props: IRouteProps) {
    const {path, exact, component, render} = props;

    function handlePop() {
        this.forceUpdate()
    }

    useEffect(() => {
        addEventListener('popstate', handlePop);
        routerCtrl.register(this);

        //clean up phase ~ componentWillUnmount
        return () => {
            routerCtrl.unregister(this);
            removeEventListener('popstate', this.handlePop)
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
