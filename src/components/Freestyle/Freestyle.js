import React, { useState } from 'react';
import useAuth from '../../Auth';
import './Freestyle.css';
// import Instagram from './Instagram/Instagram';
import SkillList from './SkillList/SkillList';
import { JumpalSpinner } from '../CustomComponents/core';


function Freestyle() {
  const [user, loading] = useAuth();
  const [openInstagram, setOpenInstagram] = useState(false);
  const [openSkillList, setOpenSkillList] = useState(true);

  const toggleInstagram = () => {
    if (openInstagram) {
      setOpenInstagram(false);
    } else {
      setOpenInstagram(true);
      setOpenSkillList(false);
    }
  };

  const toggleSkillList = () => {
    if (openSkillList) {
      setOpenSkillList(false);
    } else {
      setOpenSkillList(true);
      setOpenInstagram(false);
    }
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      return (
        <div className="freestyle-container">
          <h1>Freestyle</h1>
          <button
            className="button"
            onClick={toggleInstagram}
          >
            Instagram Inspiration
          </button>
          <button
            className="button"
            onClick={toggleSkillList}
          >
            Skill List
          </button>
          {/* {openInstagram ? <Instagram /> : null } */}
          {openSkillList ? <SkillList /> : null }
        </div>
      );
    } else {
      return <JumpalSpinner />;
    }
  }
}

export default Freestyle;
