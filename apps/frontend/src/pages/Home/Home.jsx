import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import './Home.css';

function Home() {
  return (
    <div className='componentContentDiv' style={{ height: '90vh' }}>
      <div className='speedFreestyleDiv'>
        <Link to={routes.SPEED} className='speedFreestyleButton'>
          <p>Speed</p>
        </Link>
        <Link to={routes.FREESTYLE} className='speedFreestyleButton'>
          <p>Freestyle</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
