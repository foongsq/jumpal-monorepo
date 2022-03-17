import React, { useEffect, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { off } from 'firebase/database';
import { get, onValue } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
import JumpalSpinnerWrapper from '../../Custom/JumpalSpinnerWrapper';
import
JumpalAlertFeedback,
{ alertSeverity }
  from '../../Custom/JumpalAlertFeedback';
import SkillCollapsible from './SkillCollapsible/SkillCollapsible';
import NewSkillModal from './NewSkillModal';
import './SkillList.css';
import JumpalPossiblyEmpty from '../../Custom/JumpalPossiblyEmpty';
import { messages } from '../../Custom/constants';

function SkillList() {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [success, setSuccess] = useState(null);
  const slRef = firebase.skillList;

  useEffect(() => {
    onValue(slRef, onSkillListDataChange);
    setLoading(true);
    // Get current user from firebase and save to state as user
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        const skillsDataFromDb = [];
        get(slRef).then((snapshot) => {
          const value = snapshot.val();
          skillsDataFromDb.push(value);
          setSkillsData(skillsDataFromDb);
          setLoading(false);
        })
            .catch((error) => {
              console.log(error);
            });
      } else {
        alert('Please sign in to continue');
        setLoading(false);
      }
    });
    return () => {
      off(slRef);
      unsubscribe();
    };
  }, []);

  const onAction = (msg) => {
    setSuccess(msg);
  };

  const onSkillListDataChange = (snapshot) => {
    const skillsDataFromDb = [];
    skillsDataFromDb.push(snapshot.val());
    setSkillsData(skillsDataFromDb);
  };

  const processData = () => {
    console.log('skillsData', skillsData);
    const notLearntData = [];
    const learntData = [];
    const isSkillsPopulated = skillsData && skillsData.length !== 0 &&
      !skillsData[0];
    if (isSkillsPopulated) {
      const dataValues = Object.values(skillsData[0]).reverse();
      const keys = Object.keys(skillsData[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        if (dataValues[i].learnt) {
          learntData.push([keys[i], dataValues[i]]);
        } else {
          notLearntData.push([keys[i], dataValues[i]]);
        }
      }
    }
    console.log('notLearntdata', notLearntData);
    return {
      learnt: learntData,
      notLearnt: notLearntData,
    };
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div>
        <JumpalAlertFeedback
          msg={success}
          severity={alertSeverity.SUCCESS}
          onClose={() => setSuccess(null)}
          global
        />
        <NewSkillModal />
        <JumpalPossiblyEmpty
          msg={messages.SKILLS_EMPTY}
          isPopulated={skillsData && skillsData.length >= 0 &&
            !skillsData[0]}
        >
          <div>
            <div className='skillsToLearn'>
              <h2>Skills I want to learn</h2>
              {console.log('(processData().notLearnt))',
                  (processData().notLearnt))}
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
                      onAction={onAction}
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
                        onAction={onAction}
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
  );
}

export default SkillList;