import { useState } from "react";

import Instructions from "../Instructions";
import Placeholder from "../Spotlight";
import Trigger from "../Trigger";
import SelectedOutput from "../SelectedOutput";

import "./App.css";

function App() {
  const [selected, setSelected] = useState<string>();

  function handleTrigger() {
    setSelected("No implementation; unhandled trigger");
  }

  return (
    <div className="App">
      <Instructions />
      <div className="Implementation">
        <Trigger onTrigger={handleTrigger} />

        {/* Replace the Placeholder component below with your implementation */}
        <Placeholder />

        <SelectedOutput selected={selected} />
      </div>
    </div>
  );
}

export default App;
