import { useEffect, useState } from "react";

import SpotlightResults from "./SpotlightResults";

import { Model } from "../../API";

import SelectedItemContext from "./contexts/SelectedItemContext";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";

import SpotlightInput from "./SpotlightInput";

import type { SpotlightSectionType } from "./SpotlightSection";

import "./Spotlight.scss";

type Props = {
  onSelect: (selectedItem: Model) => void;
  visible: boolean;
};

function Spotlight({ visible, onSelect }: Props) {
  const [results, setResults] = useState<SpotlightSectionType[]>([]);
  const [selectedItem, setSelectedItemID] = useKeyboardNavigation(results);
  const [shouldRender, setRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);
    }
  }, [visible]);

  function onAnimationEnd() {
    if (!visible) {
      setRender(false);
      setSelectedItemID("");
    }
  }

  if (!shouldRender) {
    return null;
  }

  const animation = `${visible ? "fadeUp" : "fadeDown"} 0.3s ease-in-out`;

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItemID }}>
      <div
        className="Spotlight"
        style={{ animation }}
        onAnimationEnd={onAnimationEnd}
      >
        <SpotlightInput onSearch={setResults} />
        <SpotlightResults onSelect={onSelect} sections={results} />
      </div>
    </SelectedItemContext.Provider>
  );
}

export default Spotlight;
