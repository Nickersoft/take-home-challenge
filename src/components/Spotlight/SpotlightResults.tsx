import { useCallback, useEffect, useRef } from "react";

import { Model } from "../../API";

import SelectedItemContext from "./contexts/SelectedItemContext";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import SpotlightSection from "./SpotlightSection";

type Props = {
  sections: { title: string; items: Model[] }[];
  onSelect: (item: Model) => void;
};

function SpotlightResults({ sections, onSelect }: Props) {
  const node = useRef<HTMLDivElement | null>(null);

  const [selectedItem, setSelectedItemID] = useKeyboardNavigation(sections);

  const onSubmit = useCallback(() => {
    console.log(selectedItem);
    if (selectedItem) {
      onSelect(selectedItem);
    }
  }, [selectedItem]);

  const onEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    },
    [onSubmit]
  );

  const onMouseMove = (e: MouseEvent) => {
    const itemID = (e.target as any)?.getAttribute("data-item-id");

    if (itemID && itemID !== selectedItem?.id) {
      setSelectedItemID(itemID);
    }
  };

  useEffect(() => {
    node.current?.addEventListener("mousedown", onSubmit);
    node.current?.addEventListener("mousemove", onMouseMove);

    document.addEventListener("keydown", onEnter);

    return () => {
      node.current?.removeEventListener("mousedown", onSubmit);
      node.current?.removeEventListener("mousemove", onMouseMove);

      document.removeEventListener("keydown", onEnter);
    };
  }, [node, onEnter, onMouseMove, onSubmit]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItemID }}>
      <div ref={node} className="search-results">
        {sections.map((section) => (
          <SpotlightSection key={section.title} section={section} />
        ))}
      </div>
    </SelectedItemContext.Provider>
  );
}

export default SpotlightResults;
