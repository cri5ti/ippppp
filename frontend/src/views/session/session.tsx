import React, {useEffect, useState} from "react";

const css = require('./session.scss');


const Sessions = () => {
  const [state, setState] = useState({loading: true});

  return (
    <div className="session">
      {state.loading && <div>Patience is a virtue</div>}
    </div>
  );
}

export default Sessions;
