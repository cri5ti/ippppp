import React, {ReactElement, useEffect, useState} from "react";

require('./busy.scss');

export const Spinner = () => (
    <div className="spinner"/>
);

export const BusyOverlay = () => (
    <div className="busy-overlay">
        <Spinner/>
    </div>
);

export const BusyRender = <T extends {}>(props: {promise: Promise<T>, children: (data: T) => Array<ReactElement> | ReactElement}) => {
    const {promise} = props;
    const [state, setState] = useState<{loading: boolean, data: T}>({loading: true, data: null});

    useEffect(() => {
        promise.then((data) => {
            setState({
                loading: false,
                data
            })
        });
    }, []);

    if(state.loading){
        return <BusyOverlay/>
    }

    return (
        <>
            {props.children(state.data)}
        </>
    )
};
