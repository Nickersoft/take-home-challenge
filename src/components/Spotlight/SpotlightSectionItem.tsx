import { useContext, useRef } from "react";

import { Model } from "../../API";

import SelectedItemContext from "./contexts/SelectedItemContext";

type Props = {
  item: Model;
};

function SpotlightSection({ item }: Props) {
  const node = useRef<HTMLLIElement | null>(null);
  const ctx = useContext(SelectedItemContext);
  const isActive = ctx.selectedItem?.id === item.id;

  return (
    <li ref={node} data-item-id={item.id} className={isActive ? "active" : ""}>
      {item.id}&nbsp;
      {item.author && <span className="author">by {item.author}</span>}
      <div className="modified">
        {item.type} &bull; Modified on&nbsp;
        {new Date(item.modified).toLocaleDateString("en")}
      </div>
    </li>
  );
}

export default SpotlightSection;
