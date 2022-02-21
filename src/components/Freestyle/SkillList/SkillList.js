import React, { useEffect, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { off } from 'firebase/database';
import { get, onValue } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
import { JumpalSpinner } from '../../CustomComponents/core';
import SkillCollapsible from '../SkillCollapsible/SkillCollapsible';
import NewSkillModal from './NewSkillModal';

import './SkillList.css';

function SkillList() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
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
          setUser(user);
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

  const onSkillListDataChange = (snapshot) => {
    const skillsDataFromDb = [];
    skillsDataFromDb.push(snapshot.val());
    setSkillsData(skillsDataFromDb);
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      let dataValues = [];
      const notLearntData = [];
      const learntData = [];
      const isSkillsPopulated = skillsData && skillsData.length !== 0 &&
          !(skillsData.length == 1 &&
          (skillsData[0] == null || skillsData[0] == undefined));
      if (isSkillsPopulated) {
        dataValues = Object.values(skillsData[0]).reverse();
        const keys = Object.keys(skillsData[0]).reverse();
        for (let i = 0; i < dataValues.length; i++) {
          if (dataValues[i].learnt) {
            learntData[i] = [keys[i], dataValues[i]];
          } else {
            notLearntData[i] = [keys[i], dataValues[i]];
          }
        }
      }
      return (
        <div>
          <NewSkillModal />
          {skillsData && skillsData.length !== 0 && user ?
            <div>
              <div className='skillsToLearn'>
                <h2>Skills I want to learn</h2>
                {notLearntData.length > 0 ?
                  notLearntData.map((object) => {
                    return (
                      <SkillCollapsible
                        key={object[0]}
                        id={object[0]}
                        skillName={object[1].skillName}
                        description={object[1].description}
                        progress={object[1].progress}
                        url={object[1].url}
                        learnt={false}
                      />
                    );
                  }) :
                  <p className='centeredText'>
                    No skills to learn... Add some above !
                  </p>
                }
              </div>
              <div className='learntSkills'>
                <h2>Skills I have learnt</h2>
                {learntData.length > 0 ?
                  learntData.map((object) => {
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
                  }) :
                  <p className='centeredText'>
                    Have not learnt any skills, jiayou!
                  </p>
                }
              </div>
            </div> :
            <p>
              Nothing to display, you could start by adding some skills above.
            </p>
          }
        </div>
      );
    } else {
      return <JumpalSpinner />;
    }
  }
}

export default SkillList;
