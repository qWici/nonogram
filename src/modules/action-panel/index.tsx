import React from "react";

import {Action, useActionPanelInteractor} from "./interactor";
import { ActionPanelRouter } from "./router";

export interface IProps {
  onSelectAction: (action: Action) => void;
  currentAction: Action;
}
export const ActionPanel: React.FC<IProps> = (props) => {
  const interactor = useActionPanelInteractor(props);
  return <ActionPanelRouter interactor={interactor} />;
};
