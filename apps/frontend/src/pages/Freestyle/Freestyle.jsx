import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import Instagram from './components/Instagram/Instagram';
import SkillList from './components/SkillList/SkillList';
import {
  JumpalToggleButtons,
  JumpalErrorText,
  JumpalSpinnerWrapper } from '../../components';
import { messages } from '../../constants';
import './Freestyle.css';

const component = {
  SKILLSLIST: 'Skills List',
  IGINSPO: 'Instagram Inspiration',
};

const toggleButtonNames = [component.SKILLSLIST, component.IGINSPO];

function Freestyle() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] =
    useState(component.SKILLSLIST);

  const toggleComponent = (event, newComponent) => {
    if (newComponent) {
      setComponentRendered(newComponent);
    }
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className='componentContentDiv'>
        <JumpalToggleButtons
          buttons={toggleButtonNames}
          value={componentRendered}
          toggle={toggleComponent}
        />
        {componentRendered === component.IGINSPO ?
          (user ?
            <Instagram /> :
            <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />) :
        componentRendered === component.SKILLSLIST ?
          (user ?
            <SkillList />:
            <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />) : null }
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default Freestyle;
