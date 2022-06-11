import React from 'react';
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
} from '../../../../components';
import SkillCollapsible from './SkillCollapsible';
import NewSkill from './NewSkill';
import { messages } from '../../../../constants';
import { isDataPopulated } from '../../../../utils';
import { SkillsApi } from './context';
import { JumpalVerticalSpacing } from '../../../../components/JumpalCommon';
import useSkillListController from './useSkillListController';

export default function SkillList() {
  const [sl, loading, api, processData] = useSkillListController();

  return (
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
                key={object[0]}
                id={object[0]}
                skillName={object[1].skillName}
                description={object[1].description}
                progress={object[1].progress}
                url={object[1].url}
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
                  key={object[0]}
                  id={object[0]}
                  skillName={object[1].skillName}
                  description={object[1].description}
                  progress={object[1].progress}
                  url={object[1].url}
                  learnt={true}
                />
              );
            })}
          </JumpalPossiblyEmpty>
        </JumpalPossiblyEmpty>
      </JumpalSpinnerWrapper>
    </SkillsApi.Provider>

  );
}
