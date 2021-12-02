import React from 'react';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='componentContentDiv'>
        <div className="homeContainerDiv">
          <div className='speedFreestyleDiv'>
            <button href='/Speed' className='speedFreestyleButton'>
              <p>Speed</p>
            </button>
            <button to='/Freestyle' className='speedFreestyleButton'>
              <p>Freestyle</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}