import React, {ReactNode, useEffect, useState} from "react";

require('./busy.scss');

export const Spinner = () => (
    <div className="spinner"/>
);

export const BusyOverlay = () => (
    <div className="busy-overlay">
        <Spinner/>
    </div>
);

export const BusyRender = <T extends unknown>(props: {promise: () => Promise<T>, children: (data: T) => ReactNode}) => {
    const {promise, children} = props;
    const [state, setState] = useState<{loading: boolean, data: T}>({loading: true, data: null});

    useEffect(() => {
        if(!promise) return;
        promise().then((data) => {
            setState({
                loading: false,
                data
            })
        });
    }, [promise]);

    if(state.loading) return <BusyOverlay/>;

    return (
        <>
            {children(state.data)}
        </>
    );
};
