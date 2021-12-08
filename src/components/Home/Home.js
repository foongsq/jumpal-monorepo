import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='componentContentDiv' style={{height: '90vh'}}>
          <div className='speedFreestyleDiv'>
            <Link to='/Speed' className='speedFreestyleButton'><p>Speed</p></Link>
            <Link to='/Freestyle' className='speedFreestyleButton'><p>Freestyle</p></Link>
          </div>
      </div>
    );
  }
}