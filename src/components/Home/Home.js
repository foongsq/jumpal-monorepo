import React from 'react';
import { Link } from 'react-router-dom';
import freestyle from '../../images/freestyle.jpg';
import speed from '../../images/speed.jpg';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="outerContainer">
        <div className='home-container'>
          <button className="speedFreestyleButtons" href="/Speed">
          <img src={speed} className='motivation-img' alt='' />
          <Link to='/Speed' className="linkSpeed">Speed</Link>
          </button>
          <button className="speedFreestyleButtons">
          <img src={freestyle} className='motivation-img' alt='' />
          <Link to='/Freestyle' className="linkSpeed">Freestyle</Link></button>
          {/* <h2 style={{textAlign:'center'}}>Motivational Quotes</h2>
          <img src={quote1} className='motivation-img' alt='' />
          <img src={quote2} className='motivation-img' alt='' />
          <img src={quote3} className='motivation-img' alt='' />
          <img src={quote4} className='motivation-img' alt='' />
          <img src={quote5} className='motivation-img' alt='' />
          <img src={quote6} className='motivation-img' alt='' />
          <img src={quote7} className='motivation-img' alt='' /> */}
        </div>
      </div>
    );
  }
}