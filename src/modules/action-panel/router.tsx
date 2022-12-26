import React from "react";

import { IActionPanelInteractor } from "./interactor";

export interface IProps {
  interactor: IActionPanelInteractor
}
export const ActionPanelRouter: React.FC<IProps> = ({ interactor }) => {
  return (
    <div>
      <p>Current: {interactor.currentAction}</p>
      <button onClick={interactor.onSelectFill}>Fill</button>
      <button onClick={interactor.onSelectCross}>Cross</button>
    </div>
  )
};
