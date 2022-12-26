import {useCallback} from "react";

export type Action = "fill" | "cross";

export interface IActionPanelInteractor {
  currentAction: Action;
  onSelectFill: () => void;
  onSelectCross: () => void;
}

interface IProps {
  onSelectAction: (action: Action) => void;
  currentAction: Action;
}
export const useActionPanelInteractor = ({ onSelectAction, currentAction }: IProps): IActionPanelInteractor => {
  const handleSelectFill = useCallback(() => {
    onSelectAction("fill");
  }, [onSelectAction])

  const handleSelectCross = useCallback(() => {
    onSelectAction("cross");
  }, [onSelectAction])

  return {
    currentAction,
    onSelectCross: handleSelectCross,
    onSelectFill: handleSelectFill
  };
};
