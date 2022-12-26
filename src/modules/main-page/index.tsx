import React from "react";

import { useMainPageInteractor } from "./interactor";
import { MainPageRouter } from "./router";

export interface IProps {}
export const MainPage: React.FC<IProps> = () => {
  const interactor = useMainPageInteractor();
  return <MainPageRouter interactor={interactor} />;
};
