import React from "react";

import {CellState, useCellInteractor} from "./interactor";
import { CellRouter } from "./router";

export interface IProps {
  state: CellState;
  onClick: () => void;
}
export const Cell: React.FC<IProps> = (props) => {
  const interactor = useCellInteractor(props);
  return <CellRouter interactor={interactor} />;
};
