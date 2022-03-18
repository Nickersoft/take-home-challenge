import { groupBy, sortBy } from "lodash";
import React, { useMemo, useState } from "react";

import { Model, search } from "../../API";

import "./Spotlight.scss";

function Spotlight() {
  const [results, setResults] = useState(search(""));

  function onKeyDown(e: any) {
    setResults(search(e.target?.value ?? ""));
  }

  const groupedResults = useMemo(() => {
    return results
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .map((r) => r.item)
      .reduce((acc, v) => {
        if (v.type in acc) {
          acc[v.type].push(v);
        } else {
          acc[v.type] = [v];
        }
        return acc;
      }, {} as { [key: string]: Model[] });
  }, [results]);

  return (
    <div className="Spotlight">
      <div className="search-area">
        <img src="/magnifyingglass.svg" className="search-icon" />
        <input
          onChange={onKeyDown}
          type="search"
          className="search-input"
          placeholder="Search"
        />
      </div>
      {results.length > 0 && (
        <div className="search-results">
          {Object.keys(groupedResults).map((key) => (
            <section>
              <h6>{key}</h6>
              <ul>
                {groupedResults[key].map((result) => (
                  <li>{result.id}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default Spotlight;
