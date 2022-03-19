import React from "react";
import { Model } from "../../../API";

const SelectedItemContext = React.createContext({
  selectedItem: null as Model | null,
  setSelectedItemID: (id: string) => {},
});

export default SelectedItemContext;
