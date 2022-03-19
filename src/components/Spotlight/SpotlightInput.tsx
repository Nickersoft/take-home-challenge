import { useEffect, useRef } from "react";

import aggregateResults from "./utils/aggregateResults";
import useSearch from "./hooks/useSearch";

import { SpotlightSectionType } from "./SpotlightSection";

type Props = {
  onSearch: (results: SpotlightSectionType[]) => void;
};

function SpotlightInput({ onSearch }: Props) {
  const inputNode = useRef<HTMLInputElement | null>(null);

  const { results, search } = useSearch();

  useEffect(
    () => onSearch( Object.values(aggregateResults(results))),
    [results]
  );

  useEffect(() => {
    inputNode.current?.focus();
  });

  return (
    <div className="SpotlightInput">
      <img src="/magnifyingglass.svg" className="search-icon" />
      <input
        ref={inputNode}
        onChange={(e) => search(e.target?.value)}
        type="search"
        className="search-input"
        placeholder="Search"
      />
    </div>
  );
}

export default SpotlightInput;
