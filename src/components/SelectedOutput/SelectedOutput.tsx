import React from "react";

import "./SelectedOutput.css";

function SelectedOutput({ selected = "Nothing selected" }) {
  const selectedString = selected.toString();
  return (
    <div className="Output" data-cy="selected-output">
      <p>Selected Output:</p>
      <p>{selectedString}</p>
    </div>
  );
}

export default SelectedOutput;
