import React, {useEffect, useState} from "react";

const css = require('./tournament.scss');


export const Tournament = () => {
  const [state, setState] = useState({loading: true});

  return (
    <div className="tournament">
      {state.loading && <div>Patience is a virtue</div>}
    </div>
  );
}