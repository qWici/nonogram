import React from "react";
import s from "./main-page.module.scss"
import { IMainPageInteractor } from "./interactor";
import {Cell} from "../cell";
import {ActionPanel} from "../action-panel";
import {TwoDMatrix} from "../../global";

export interface IProps {
  interactor: IMainPageInteractor
}
export const MainPageRouter: React.FC<IProps> = ({ interactor }) => {
  const render = () => {
    return interactor.gameState.map((row, ri) => {
      return row.map((item, ci) => {
        return (<Cell state={item} onClick={() => interactor.onCellClick(ri, ci)} key={`${ri}${ci}`} />)
      })
    })
  }

  const renderInstructions = (instructions: TwoDMatrix<number>) => {
      return instructions.map((row, i) => {
          return (
              <div key={i}>
                  {
                      row.map((item, index) => {
                          return (<span key={index}>{item}</span>)
                      })
                  }
              </div>
          )
      })
  }

  return (
      <div className={s.wrapper}>
          <div>
              <div className={s.cols}>{ renderInstructions(interactor.cols) }</div>
              <div className={s.tableWrapper}>
                  <div className={s.rows}>{ renderInstructions(interactor.rows) }</div>
                  <div className={s.table}>
                      { render() }
                  </div>
              </div>
              <ActionPanel
                  currentAction={interactor.currentAction}
                  onSelectAction={interactor.onSelectAction}
              />
          </div>
      </div>
  )
};
