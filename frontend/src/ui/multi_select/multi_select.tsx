import React, {ReactNode, useEffect, useState} from "react";
import {cls} from "../../util/react";
import {List} from "../list/list";

const css = require('./multi_select.scss');

interface IMultiSelectProps<T> {
    allItems: Array<T>;
    initialSelection: Array<T>;
    itemRender: (item: T) => ReactNode;
    onChange: (result: {added:Array<T>; removed: Array<T>}) => void;
}

interface IMultiSelectState<T> {
    itemsSelected: Array<T>;
    itemsAvailable: Array<T>;
    tempSelectedCodes: Array<string>;
    tempAvailableCodes: Array<string>;
}

export function MultiSelect<T extends {code: string}>(props: IMultiSelectProps<T>){
    const {allItems, initialSelection, itemRender, onChange} = props;
    const sItemsCodes = initialSelection.map(i => i.code);
    const aItems = allItems.filter(i => !sItemsCodes.includes(i.code));
    const [state, setState] = useState<IMultiSelectState<T>>();

    const {itemsSelected, itemsAvailable, tempSelectedCodes, tempAvailableCodes} = state || {};

    useEffect(() => {
        setState({
            itemsAvailable: aItems,
            itemsSelected: initialSelection,
            tempAvailableCodes: [],
            tempSelectedCodes: []
        })
    }, [allItems, initialSelection]);

    const onItemClick = (item: T, stateProperty: string) => {
        const data: Array<string> = [...state[stateProperty]];
        const index = data.indexOf(item.code);

        index === -1 ? data.push(item.code) : data.splice(index, 1);

        setState({...state, [stateProperty]: data})
    };

    const onItemRender = (item: T, stateProperty: string) => {
        const data: Array<string> = state[stateProperty];
        const isSelected = data.includes(item.code);

        return (
            <label htmlFor={item.code}
                   className={cls( isSelected && css.selected)}>
                <input type="checkbox" name={item.code} id={item.code} checked={isSelected}/>
                {itemRender(item)}
            </label>
        )
    };

    //todo remove duplication :(

    const onAdd = () => {
        const _itemsAvailable = [...itemsAvailable].filter(i => !tempAvailableCodes.includes(i.code));
        const _itemsSelected = [...itemsSelected, ...tempAvailableCodes.map(i => allItems.find(j => j.code === i))];
        const _tempSelectedCodes = [...tempAvailableCodes];

        _onChange(_itemsSelected);
        setState({itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable, tempSelectedCodes: _tempSelectedCodes, tempAvailableCodes: []})
    };

    const onAddAll = () => {
        const _itemsAvailable = [];
        const _itemsSelected = [...allItems];
        const _tempSelectedCodes = [...tempAvailableCodes];

        _onChange(_itemsSelected);
        setState({itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable, tempSelectedCodes: _tempSelectedCodes, tempAvailableCodes: []})
    };

    const onRemoveAll = () => {
        const _itemsSelected = [];
        const _itemsAvailable = [...allItems];
        const _tempAvailableCodes = [...tempSelectedCodes];

        _onChange(_itemsSelected);
        setState({...state, itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable, tempAvailableCodes: _tempAvailableCodes, tempSelectedCodes: []})
    };

    const onRemove = () => {
        const _itemsSelected = [...itemsSelected].filter(i => !tempSelectedCodes.includes(i.code));
        const _itemsAvailable = [...itemsAvailable, ...tempSelectedCodes.map(i => allItems.find(j => j.code === i))];
        const _tempAvailableCodes = [...tempSelectedCodes];

        _onChange(_itemsSelected);
        setState({itemsSelected: _itemsSelected, itemsAvailable: _itemsAvailable, tempAvailableCodes: _tempAvailableCodes, tempSelectedCodes: []})
    };

    const _onChange = (itemsSelected: Array<T>) => {
        const added = itemsSelected.filter(i => !initialSelection.some(j => j.code === i.code));
        const removed = initialSelection.filter(i => !itemsSelected.some(j => j.code === i.code));

        onChange({added, removed})
    };

    return (
        <div className={"multi-select"}>
            <List<T> data={itemsAvailable || []}
                     itemRender={(item) => onItemRender(item, "tempAvailableCodes")}
                     onItemClick={(item) => onItemClick(item, "tempAvailableCodes")}/>
            <div className={"controls"}>
                <button onClick={onAdd}>Add</button>
                <button onClick={onAddAll}>Add all</button>
                <button onClick={onRemoveAll}>Remove all</button>
                <button onClick={onRemove}>Remove</button>
            </div>
            <List<T> data={itemsSelected || []}
                     itemRender={(item) => onItemRender(item, "tempSelectedCodes")}
                     onItemClick={(item) => onItemClick(item, "tempSelectedCodes")}/>
        </div>
    );
}
