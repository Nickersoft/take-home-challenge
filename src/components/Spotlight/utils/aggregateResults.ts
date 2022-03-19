import Fuse from "fuse.js";
import startCase from "lodash/startCase";

import { Model } from "../../../API";
import { SpotlightSectionType } from "../SpotlightSection";

function aggregateResults(results: Fuse.FuseResult<Model>[]) {
  return results
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .map((r) => r.item)
    .reduce((acc, v) => {
      if (v.type in acc) {
        acc[v.type].items.push(v);
        acc[v.type].items.sort((a, b) => a?.id.localeCompare(b?.id));
      } else {
        acc[v.type] = { title: startCase(v.type), items: [v] };
      }
      return acc;
    }, {} as { [key: string]: SpotlightSectionType });
}

export default aggregateResults;
