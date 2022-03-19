import { useCallback, useContext, useEffect, useRef } from "react";

import { Model } from "../../API";

import SelectedItemContext from "./contexts/SelectedItemContext";
import SpotlightSection, { SpotlightSectionType } from "./SpotlightSection";

type Props = {
  sections: SpotlightSectionType[];
  onSelect: (item: Model) => void;
};

function SpotlightResults({ sections, onSelect }: Props) {
  const node = useRef<HTMLDivElement | null>(null);

  const { selectedItem, setSelectedItemID } = useContext(SelectedItemContext);

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
    <div ref={node} className="SpotlightResults">
      {sections.map((section) => (
        <SpotlightSection key={section.title} section={section} />
      ))}
    </div>
  );
}

export default SpotlightResults;
