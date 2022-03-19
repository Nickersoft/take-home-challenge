import { useState } from "react";

import Instructions from "../Instructions";
import Spotlight from "../Spotlight";
import Trigger from "../Trigger";
import SelectedOutput from "../SelectedOutput";

import "./App.css";

function App() {
  const [spotlightOpen, setSpotlightOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>();

  function handleTrigger() {
    setSpotlightOpened(true);
  }

  return (
    <div className="App">
      <Instructions />
      <div className="Implementation">
        <Trigger onTrigger={handleTrigger} />

        {spotlightOpen && (
          <Spotlight
            onSelect={(item) => {
              console.log(item);
              setSelected(item.id);
              setSpotlightOpened(false);
            }}
          />
        )}

        <SelectedOutput selected={selected} />
      </div>
    </div>
  );
}

export default App;
