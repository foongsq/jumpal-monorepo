import React, { useEffect } from 'react';
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
} from '../../../../components';
import SkillCollapsible from './SkillCollapsible';
import NewSkillModal from './NewSkillModal';
import './SkillList.css';
import { messages } from '../../../../constants';
import { isDataPopulated } from '../../../../utils';
import { useSlDb } from '../../../../hooks';
import { SkillsApi } from './context';

function SkillList() {
  const [sl, loading, getSl, getSkill,
    addSkill, delSkill, updateSkill] = useSlDb();

  const api = { getSl, getSkill, addSkill, delSkill, updateSkill };

  useEffect(() => {
    getSl();
  }, []);

  const processData = () => {
    const notLearntData = [];
    const learntData = [];
    if (isDataPopulated(sl)) {
      const dataValues = Object.values(sl[0]).reverse();
      const keys = Object.keys(sl[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        if (dataValues[i].learnt) {
          learntData.push([keys[i], dataValues[i]]);
        } else {
          notLearntData.push([keys[i], dataValues[i]]);
        }
      }
    }
    return {
      learnt: learntData,
      notLearnt: notLearntData,
    };
  };

  return (
    <SkillsApi.Provider value={api}>
      <JumpalSpinnerWrapper loading={loading}>
        <div>
          <NewSkillModal />
          <JumpalPossiblyEmpty
            msg={messages.SKILLS_EMPTY}
            isPopulated={isDataPopulated(sl)}
          >
            <div>
              <div className='skillsToLearn'>
                <h2>Skills I want to learn</h2>
                <JumpalPossiblyEmpty
                  msg={messages.NOTLEARNT_SKILLS_EMPTY}
                  isPopulated={processData().notLearnt.length > 0}
                >
                  <div>
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
                  </div>
                </JumpalPossiblyEmpty>
              </div>
              <div className='learntSkills'>
                <h2>Skills I have learnt</h2>
                <JumpalPossiblyEmpty
                  msg={messages.LEARNT_SKILLS_EMPTY}
                  isPopulated={processData().learnt.length > 0}
                >
                  <div>
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
                  </div>
                </JumpalPossiblyEmpty>
              </div>
            </div>
          </JumpalPossiblyEmpty>
        </div>
      </JumpalSpinnerWrapper>
    </SkillsApi.Provider>

  );
}

export default SkillList;
