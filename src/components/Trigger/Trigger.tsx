import React from "react";

import "./Trigger.css";

type Props = {
  onTrigger: () => void;
};

function Trigger({ onTrigger }: Props) {
  return (
    <div className="Trigger">
      <button
        type="button"
        onClick={() => onTrigger()}
        data-cy="trigger-implmentation"
      >
        Trigger
      </button>
    </div>
  );
}

export default Trigger;
