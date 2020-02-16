import React, {ReactElement} from "react";
import {cls} from "../../util/react";

const css = require('./list.scss');

interface IListProps<T>{
    data: Array<T>;
    itemRender: (item: T) => ReactElement;
    onItemClick: (item: T) => void;
}
export function List<T>(props: IListProps<T>){
    const {data, itemRender, onItemClick} = props;

    return (
        <ol className={cls("list")}>
            {data.map((i,k) =>
                <li key={k} onClick={() => onItemClick(i)}>{itemRender(i)}</li>
            )}
        </ol>
    )
}
