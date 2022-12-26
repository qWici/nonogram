import {useCallback, useState} from "react";

export type CellState = "crossed" | "filled" | "empty";
export interface ICellInteractor {
  onClick: () => void;
  state: CellState;
}

interface IProps {
  state: CellState;
  onClick: () => void;
}
export const useCellInteractor = ({ state, onClick }: IProps): ICellInteractor => {
  const handleClick = useCallback(() => {
    if (state !== "empty") return;

    onClick();
  }, [onClick, state])

  return {
    state,
    onClick: handleClick
  };
};
