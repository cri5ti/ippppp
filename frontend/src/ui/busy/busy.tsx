import React from "react";

require('./busy.scss');

export const Spinner = () => (
    <div className="spinner"/>
);

export const BusyOverlay = () => (
    <div className="busy-overlay">
        <Spinner/>
    </div>
);