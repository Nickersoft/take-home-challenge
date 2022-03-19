import { useEffect, useMemo, useRef } from "react";

import ReactTransitionGroup from "react-transition-group";

import aggregateResults from "./utils/aggregateResults";
import useSearch from "./hooks/useSearch";
import SpotlightResults from "./SpotlightResults";

import { Model } from "../../API";

import "./Spotlight.scss";

type Props = {
  onSelect: (selectedItem: Model) => void;
};

function Spotlight({ onSelect }: Props) {
  const inputNode = useRef<HTMLInputElement | null>(null);

  const { results, search } = useSearch();

  const resultSections = useMemo(
    () => Object.values(aggregateResults(results)),
    [results]
  );

  useEffect(() => {
    inputNode.current?.focus();
  }, []);

  return (
    <>
      <div className="Overlay" />
      <div className="Spotlight">
        <div className="search-area">
          <img src="/magnifyingglass.svg" className="search-icon" />
          <input
            ref={inputNode}
            onChange={(e) => search(e.target?.value)}
            type="search"
            className="search-input"
            placeholder="Search"
          />
        </div>
        <SpotlightResults onSelect={onSelect} sections={resultSections} />
      </div>
    </>
  );
}

export default Spotlight;
