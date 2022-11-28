import React from "react";
import Media from "./components/Media/Media";
import SkillList from "./components/SkillList/SkillList";
import {
  JumpalToggleButtons,
  JumpalSpinnerWrapper,
  JumpalPageContainer,
} from "../../components";
import { freestyleComponent, freestyleToggleButtons } from "../../constants";
import useFreestyleController from "./useFreestyleController";

export default function Freestyle() {
  const [loading, componentRendered, toggleComponent] =
    useFreestyleController();

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <JumpalPageContainer>
        <JumpalToggleButtons
          buttons={freestyleToggleButtons}
          value={componentRendered}
          toggle={toggleComponent}
        />
        <Media hide={!(componentRendered === freestyleComponent.IGINSPO)} />
        <SkillList
          hide={!(componentRendered === freestyleComponent.SKILLSLIST)}
        />
      </JumpalPageContainer>
    </JumpalSpinnerWrapper>
  );
}
