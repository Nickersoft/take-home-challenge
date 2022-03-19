import { useCallback, useEffect, useMemo, useState } from "react";

import { SpotlightSectionType } from "../SpotlightSection";

function useKeyboardNavigation(sections: SpotlightSectionType[]) {
  const [selectedItemID, setSelectedItemID] = useState("");

  const items = useMemo(
    () => sections.map(({ items }) => items).flat(),
    [sections]
  );

  const selectedItem = useMemo(
    () => items.find(({ id }) => id === selectedItemID) ?? null,
    [items, selectedItemID]
  );

  const moveCursor = useCallback(
    (direction: "up" | "down") => {
      if (direction === "down" && selectedItemID.length === 0) {
        setSelectedItemID(items?.[0]?.id ?? "");
      }

      const item = items.findIndex(({ id }) => id === selectedItemID);
      const nextItem = items[direction === "down" ? item + 1 : item - 1];

      if (nextItem) {
        setSelectedItemID(nextItem.id);

        // Workaround for preventing scrolling-into-view when users mouseover items instead of using the keyboard
        // For the record – I don't like this approach
        document
          .querySelector(`[data-item-id="${nextItem.id}"`)
          ?.scrollIntoView({ block: "end" });
      }
    },
    [items, selectedItemID]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveCursor("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveCursor("up");
      }
    },
    [moveCursor]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return [selectedItem, setSelectedItemID] as const;
}

export default useKeyboardNavigation;
