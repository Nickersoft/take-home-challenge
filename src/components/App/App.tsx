import { useEffect, useState } from "react";

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

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setSpotlightOpened(false);
    } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      setSpotlightOpened(true);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="App">
      <Instructions />
      <div className="Implementation">
        <Trigger onTrigger={handleTrigger} />

        <Spotlight
          visible={spotlightOpen}
          onSelect={(item) => {
            console.log(item);
            setSelected(item.id);
            setSpotlightOpened(false);
          }}
        />

        <SelectedOutput selected={selected} />
      </div>
    </div>
  );
}

export default App;
