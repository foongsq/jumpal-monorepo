import React from "react";
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
  JumpalErrorText,
  JumpalHideableComponent,
} from "../../../../components";
import SkillCollapsible from "./SkillCollapsible";
import NewSkill from "./NewSkill";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import { SkillsApi } from "./context";
import { JumpalVerticalSpacing } from "../../../../components/JumpalCommon.tsx";
import useSkillListController from "./useSkillListController";
import PropTypes from "prop-types";
import { useAuth } from "../../../../data";

SkillList.propTypes = {
  hide: PropTypes.boolean,
};

export default function SkillList(props) {
  const { hide } = props;
  const [user] = useAuth();
  const [sl, loading, api, processData] = useSkillListController();

  return (
    <JumpalHideableComponent hide={hide}>
      {!user ? (
        <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />
      ) : (
        <SkillsApi.Provider value={api}>
          <JumpalSpinnerWrapper loading={loading}>
            <NewSkill />
            <JumpalPossiblyEmpty
              msg={messages.SKILLS_EMPTY}
              isPopulated={isDataPopulated(sl)}
            >
              <h2>Skills I want to learn</h2>
              <JumpalPossiblyEmpty
                msg={messages.NOTLEARNT_SKILLS_EMPTY}
                isPopulated={processData().notLearnt.length > 0}
              >
                {processData().notLearnt.map((object) => (
                  <SkillCollapsible
                    key={object.recordId}
                    id={object.recordId}
                    skillName={object.skillName}
                    description={object.description}
                    progress={object.progress}
                    url={object.url}
                    learnt={false}
                  />
                ))}
              </JumpalPossiblyEmpty>
              <JumpalVerticalSpacing />
              <h2>Skills I have learnt</h2>
              <JumpalPossiblyEmpty
                msg={messages.LEARNT_SKILLS_EMPTY}
                isPopulated={processData().learnt.length > 0}
              >
                {processData().learnt.map((object) => {
                  return (
                    <SkillCollapsible
                      key={object.recordId}
                      id={object.recordId}
                      skillName={object.skillName}
                      description={object.description}
                      progress={object.progress}
                      url={object.url}
                      learnt={true}
                    />
                  );
                })}
              </JumpalPossiblyEmpty>
            </JumpalPossiblyEmpty>
          </JumpalSpinnerWrapper>
        </SkillsApi.Provider>
      )}
    </JumpalHideableComponent>
  );
}
