import { useState } from "react";

import { search } from "../../../API";

function useSearch() {
  const [results, setResults] = useState(search(""));

  return {
    search: (query?: string) => {
      setResults(search(query ?? ""));
    },
    results,
  };
}

export default useSearch;
