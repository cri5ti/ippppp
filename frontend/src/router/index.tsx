import React from "react";

class RouterCtrl{
    private _instances = [];

    public register(component){
        this._instances.push(component);
    }

    public unregister(component){
        this._instances.splice(this._instances.indexOf(component), 1);
    }

    public historyPush(path){
        history.pushState({}, null, path);
        this._instances.forEach(instance => instance.forceUpdate())
    }

    public historyReplace(path){
        history.replaceState({}, null, path);
        this._instances.forEach(instance => instance.forceUpdate())
    }

    public matchPath(pathname, options){
        const exact = options.exact || false;
        const path = options.path;

        if (!path) {
            return {
                path: null,
                url: pathname,
                isExact: true
            }
        }

        const match = new RegExp(`^${path}`).exec(pathname)

        if (!match)
            return null;

        const url = match[0];
        const isExact = pathname === url;

        if (exact && !isExact)
            return null;

        return {
            path,
            url,
            isExact,
        }
    }
};

export default new RouterCtrl();

