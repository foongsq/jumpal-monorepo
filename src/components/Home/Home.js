import React from 'react';
import { Link } from 'react-router-dom';
// import freestyle from '../../images/freestyle.jpg';
// import speed from '../../images/speed.jpg';
import freestyle2 from '../../images/freestyle2.jpg';
import speed2 from '../../images/speed2.jpg';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='componentContentDiv'>
        <div className="homeContainerDiv">
          <div className='speedFreestyleDiv'>
            <Link to='/Speed' className='speedFreestyleLink'>
              <img src={speed2} className='speedFreestyleButtonImage' alt='' />
              <p>Speed</p>
            </Link>
            
            <Link to='/Freestyle' className='speedFreestyleLink'>
              <img src={freestyle2} className='speedFreestyleButtonImage' alt='' />
              <p>Freestyle</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}