import React from "react";
import s from "./cell.module.scss"
import { ICellInteractor } from "./interactor";
import classNames from "classnames";

export interface IProps {
  interactor: ICellInteractor
}
export const CellRouter: React.FC<IProps> = ({ interactor }) => {
  const classes = classNames({
    [s.cell]: true,
    [s.filled]: interactor.state === "filled",
    [s.crossed]: interactor.state === "crossed"
  })
  return (
    <div onClick={interactor.onClick} className={classes}></div>
  )
};
