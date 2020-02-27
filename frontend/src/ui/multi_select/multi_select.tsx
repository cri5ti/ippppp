import React, {ReactNode, useEffect, useState} from "react";
import {cls} from "../../util/react";
import {List} from "../list/list";

const css = require('./multi_select.scss');

interface IMultiSelectProps<T> {
    allItems: Array<T>;
    initialSelection: Array<T>;
    itemRender: (item: T) => ReactNode;
}

interface IMultiSelectState<T> {
    itemsSelected: Set<T>;
    itemsAvailable: Set<T>;
    tempSelected: Set<T>;
    tempAvailable: Set<T>;
}

export function MultiSelect<T extends {code: string}>(props: IMultiSelectProps<T>){
    const {allItems, initialSelection, itemRender} = props;
    const sItemsCodes = initialSelection.map(i => i.code);
    const aItems = allItems.filter(i => !sItemsCodes.includes(i.code));
    const [state, setState] = useState<IMultiSelectState<T>>({itemsAvailable: new Set([]), itemsSelected: new Set([]), tempAvailable: new Set([]), tempSelected: new Set([])});

    const {itemsSelected, itemsAvailable, tempSelected, tempAvailable} = state;

    useEffect(() => {
        setState({
            itemsAvailable: new Set(aItems),
            itemsSelected: new Set(initialSelection),
            tempAvailable: new Set([]),
            tempSelected: new Set([])
        })
    }, [allItems, initialSelection]);

    const onItemClick = (item: T, set: Set<T>) => {
        set.has(item) ?  set.delete(item) : set.add(item)
    };

    const _itemRender = (item: T) => {
        const isSelected = itemsSelected.has(item);

        return (
            <label htmlFor={item.code}
                   className={cls( isSelected && css.selected)}>
                <input type="checkbox" name={item.code} id={item.code} checked={isSelected}/>
                {itemRender(item)}
            </label>
        )
    };

    const onAddItems = () => {
        const _itemsAvailable = new Set([...itemsAvailable].filter(i => tempAvailable.has(i)));
        const _itemsSelected = new Set([...itemsSelected, ...tempAvailable]);
        setState({...state, itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable})
    };

    const onAddAll = () => {
        const _itemsAvailable = new Set([]);
        const _itemsSelected = new Set([...allItems]);
        setState({...state, itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable})
    };

    const onRemoveAll = () => {
        const _itemsAvailable = new Set([...allItems]);
        const _itemsSelected = new Set([]);
        setState({...state, itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable})
    };

    const onRemoveItems = () => {
        const _itemsSelected = new Set([...itemsSelected].filter(i => tempSelected.has(i)));
        const _itemsAvailable = new Set([...itemsAvailable, ...tempSelected]);
        setState({...state, itemsAvailable: _itemsAvailable, itemsSelected: _itemsSelected})
    };

    return (
        <div className={"multi-select"}>
            <List<T> data={Array.from(itemsAvailable)}
                     itemRender={_itemRender}
                     onItemClick={(item) => onItemClick(item, tempAvailable)}/>
            <div>
                <button onClick={onAddItems}>Add</button>
                <button onClick={onAddAll}>Add all</button>
                <button onClick={onRemoveAll}>Remove all</button>
                <button onClick={onRemoveItems}>Remove</button>
            </div>
            <List<T> data={Array.from(itemsSelected)}
                     itemRender={_itemRender}
                     onItemClick={(item) => onItemClick(item, tempSelected)}/>
        </div>
    );
}
