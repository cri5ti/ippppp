import React, {useEffect, useState} from "react";

const css = require('./tournament.scss');


export const Session = () => {
  const [state, setState] = useState({loading: true});

  return (
    <div className="session">
      {state.loading && <div>Patience is a virtue</div>}
    </div>
  );
}
