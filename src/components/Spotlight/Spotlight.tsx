import { useEffect, useRef, useState } from "react";

import SpotlightResults from "./SpotlightResults";

import { Model } from "../../API";

import SelectedItemContext from "./contexts/SelectedItemContext";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";

import SpotlightInput from "./SpotlightInput";

import type { SpotlightSectionType } from "./SpotlightSection";

import "./Spotlight.scss";

type Props = {
  onSelect: (selectedItem: Model) => void;
  onDismiss?: () => void;
  visible: boolean;
};

function Spotlight({ onDismiss, visible, onSelect }: Props) {
  const node = useRef<HTMLDivElement | null>(null);

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

  const animation = `${visible ? "fadeUp" : "fadeDown"} 0.3s ease-in-out`;

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!node.current?.contains(e.target as Node)) {
        onDismiss?.();
      }
    };

    document.addEventListener("mousedown", onMouseDown);

    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItemID }}>
      <div
        ref={node}
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
