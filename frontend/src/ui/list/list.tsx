import React, {ReactElement} from "react";
import {cls} from "../../util/react";
import {BusyRender} from "../busy/busy";

const css = require('./list.scss');

interface IListProps<T> {
    data: Array<T> | (() => Promise<Array<T>>);
    itemRender: (item: T) => ReactElement;
    onItemClick: (item: T) => void;
}

export function List<T>(props: IListProps<T>) {
    const {data, itemRender, onItemClick} = props;

    const promise = Array.isArray(data) ? () => Promise.resolve(data) : data;

    return (
        <ol className={cls("list")}>
            <BusyRender<Array<T>> promise={promise}>
                {(items) => (
                    items.map((i, k) =>
                        <li key={k} onClick={() => onItemClick(i)}>{itemRender(i)}</li>
                    )
                )}
            </BusyRender>
        </ol>
    )
}
