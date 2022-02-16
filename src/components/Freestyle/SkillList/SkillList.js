import React, { useEffect, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { off } from 'firebase/database';
import { get, push, onValue } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
import { JumpalSpinner } from '../../CustomComponents/core';
import SkillCollapsible from '../SkillCollapsible/SkillCollapsible';

function SkillList() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skillName, setSkillName] = useState('-');
  const [progress, setProgress] = useState([['-', new Date().toString()]]);
  const [url, setUrl] = useState('-');
  const [skillsData, setSkillsData] = useState([]);
  let skillForm = null;
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

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleProgressChange = (event) => {
    setProgress([[event.target.value, new Date().toString()]]);
  };

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const submitEntry = (event) => {
    event.preventDefault();
    console.log('call submit entry');
    push(slRef, {
      skillName: skillName,
      progress: progress,
      url: url,
      learnt: false,
    });
    window.alert('New skill saved successfully!');
    skillForm.reset();
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      let dataValues = [];
      const notLearntData = [];
      const learntData = [];
      if (skillsData && skillsData.length !== 0) {
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
          <h1>Skill List</h1>
          <form ref={(el) => skillForm = el} className="form">
            <label>Skill Name:
              <input
                className="input"
                onChange={handleSkillNameChange}
                type="text"
                placeholder="Enter freestyle skill name here"
              />
            </label>
            <label>Progress: (as of {new Date().toDateString()})
              <input
                className="input"
                onChange={handleProgressChange}
                type="text"
                placeholder="Enter progress here"
              />
            </label>
            <label>Instagram URL:
              <input
                className="input"
                type="text"
                onChange={handleURLChange}
                placeholder="Enter Instagram URL here"
              />
            </label>
            <div className="button-div">
              {user ?
                <input
                  type="submit"
                  onClick={submitEntry}
                  className="button"
                /> :
                <input type="submit" disabled />
              }
            </div>
          </form>
          {skillsData && skillsData.length !== 0 && user ?
            <div>
              <h2>Skills I want to learn</h2>
              {notLearntData.length > 0 ?
                notLearntData.map((object) => {
                  return (
                    <SkillCollapsible
                      skillName={object[1].skillName}
                      description={object[1].description}
                      progress={object[1].progress}
                      url={object[1].url}
                      id={object[0]}
                      learnt={false}
                      key={object[0]}
                    />
                  );
                }) :
                <p style={{ textAlign: 'center' }}>
                  No skills to learn... Add some above !
                </p>
              }
              <h2>Skills I have learnt</h2>
              {learntData.length > 0 ?
                learntData.map((object) => {
                  return (
                    <SkillCollapsible
                      skillName={object[1].skillName}
                      description={object[1].description}
                      progress={object[1].progress}
                      url={object[1].url}
                      id={object[0]}
                      learnt={true}
                      key={object[0]}
                    />
                  );
                }) :
                <p style={{ textAlign: 'center' }}>
                  Have not learnt any skills, jiayou!
                </p>
              }
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
