import { startCase } from "lodash";

import { Model } from "../../API";

import SpotlightSectionItem from "./SpotlightSectionItem";

export type SpotlightSectionType = {
  title: string;
  items: Model[];
};

type Props = {
  section: SpotlightSectionType;
};

function SpotlightSection({ section: { title, items } }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <h6>{startCase(title)}</h6>
      <ul>
        {items.map((result) => (
          <SpotlightSectionItem key={result.id} item={result} />
        ))}
      </ul>
    </section>
  );
}

export default SpotlightSection;
