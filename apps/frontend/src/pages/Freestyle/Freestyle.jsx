import React from "react";
import Media from "./components/Media/Media";
import SkillList from "./components/SkillList/SkillList";
import {
  JumpalToggleButtons,
  JumpalErrorText,
  JumpalSpinnerWrapper,
  JumpalPageContainer,
} from "../../components";
import {
  messages,
  freestyleComponent,
  freestyleToggleButtons,
} from "../../constants";
import useFreestyleController from "./useFreestyleController";

export default function Freestyle() {
  const [user, loading, componentRendered, toggleComponent] =
    useFreestyleController();

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <JumpalPageContainer>
        <JumpalToggleButtons
          buttons={freestyleToggleButtons}
          value={componentRendered}
          toggle={toggleComponent}
        />
        {componentRendered === freestyleComponent.IGINSPO ? (
          user ? (
            <Media />
          ) : (
            <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />
          )
        ) : componentRendered === freestyleComponent.SKILLSLIST ? (
          user ? (
            <SkillList />
          ) : (
            <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />
          )
        ) : null}
      </JumpalPageContainer>
    </JumpalSpinnerWrapper>
  );
}
