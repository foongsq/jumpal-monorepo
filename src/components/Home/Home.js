import React from 'react';
import { Link } from 'react-router-dom';
import freestyle from '../../images/freestyle.jpg';
import speed from '../../images/speed.jpg';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='componentContentDiv'>
        <div className='homeContainerDiv'>
           
            <Link to='/Speed' className='speedFreestyleLink'>
              <img src={speed} className='speedFreestyleButtonImage' alt='' />
              <p>Speed</p>
            </Link>
            
            <Link to='/Freestyle' className='speedFreestyleLink'>
              <img src={freestyle} className='speedFreestyleButtonImage' alt='' />
              <p>Freestyle</p>
            </Link>
        </div>
      </div>
    );
  }
}