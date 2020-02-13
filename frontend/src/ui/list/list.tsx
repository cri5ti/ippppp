import React, {ReactElement} from "react";
import {cls} from "../../util/react";

const css = require('./list.scss');

interface IListProps<T>{
    className?: string;
    header?: T;
    data: Array<T>;
    component: (item: T, key: React.Key) => ReactElement
}

export function List<T>(props: IListProps<T>){
    const {data, component, className, header} = props;

    return (
        <div className={cls("list", className)}>
            {header && component(header, "header")}
            {data.map((i, ix) => component(i, ix))}
        </div>
    )
}
