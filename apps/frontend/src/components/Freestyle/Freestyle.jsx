import React, { useState } from 'react';
import useAuth from '../../auth';
import Instagram from './Instagram/Instagram';
import SkillList from './SkillList/SkillList';
import JumpalSpinner from '../Custom/JumpalSpinner';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Freestyle.css';

const igInspo = 'Instagram Inspiration';
const skillsList = 'Skills List';

function Freestyle() {
  const [user, loading] = useAuth();
  const [component, setComponent] = useState(skillsList);

  const toggleComponent = (event, newComponent) => {
    if (newComponent) {
      setComponent(newComponent);
    }
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      return (
        <div className='componentContentDiv'>
          <ToggleButtonGroup
            exclusive
            value={component}
            onChange={toggleComponent}
            color='primary'
            className='freestyleButtonDiv'
          >
            <ToggleButton value={skillsList}>
              {skillsList}
            </ToggleButton>
            <ToggleButton value={igInspo}>
              {igInspo}
            </ToggleButton>
          </ToggleButtonGroup>
          {component === igInspo ? <Instagram /> :
          component === skillsList ? <SkillList /> : null }
        </div>
      );
    } else {
      return (
        <div className='componentContentDiv'>
          <ToggleButtonGroup
            exclusive
            value={component}
            onChange={toggleComponent}
            color='primary'
            className='freestyleButtonDiv'
          >
            <ToggleButton value={skillsList}>
              {skillsList}
            </ToggleButton>
            <ToggleButton value={igInspo}>
              {igInspo}
            </ToggleButton>
          </ToggleButtonGroup>
          {component === igInspo ?
            <p className="centeredText" style={{ color: 'red' }}>
              Please sign in to see your Instagram inspiration
            </p> :
          component === skillsList ?
            <p className="centeredText" style={{ color: 'red' }}>
              Please sign in to see your freestyle skills
            </p> : null }
        </div>
      );
    }
  }
}

export default Freestyle;
